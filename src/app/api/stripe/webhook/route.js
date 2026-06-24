import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { stripe } from "@/lib/stripe";

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_URI);

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}`},
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata?.user_id;
      const planKey = session.metadata?.planKey;

      if (!userId || !planKey) {
        return NextResponse.json(
          { error: "Missing userId or planKey" },
          { status: 400 }
        );
      }

      await client.connect();

      const usersCollection = client
        .db("fitsphere_DB")
        .collection("user");

      const query = ObjectId.isValid(userId)
        ? { _id: new ObjectId(userId) }
        : { _id: userId };

      await usersCollection.updateOne(query, {
        $set: {
          plan: planKey,
          subscriptionStatus: "active",
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}