import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { stripe } from "@/lib/stripe";

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_URI);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "sessionId is required" },
        { status: 400 }
      );
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    const userId = stripeSession.metadata?.user_id;
    const planKey = stripeSession.metadata?.planKey;

    if (!userId || !planKey) {
      return NextResponse.json(
        { success: false, message: "Missing userId or planKey in metadata" },
        { status: 400 }
      );
    }

    await client.connect();

    const usersCollection = client.db("fitsphere_DB").collection("user");

    const query = ObjectId.isValid(userId)
      ? { _id: new ObjectId(userId) }
      : { _id: userId };

    const result = await usersCollection.updateOne(query, {
      $set: {
        plan: planKey,
        subscriptionStatus: "active",
        stripeCustomerId: stripeSession.customer,
        stripeSubscriptionId: stripeSession.subscription,
        updatedAt: new Date(),
      },
    });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscription confirmed successfully",
      plan: planKey,
    });
  } catch (error) {
    console.error("Subscription confirm error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to confirm subscription",
        error: error.message,
      },
      { status: 500 }
    );
  }
}