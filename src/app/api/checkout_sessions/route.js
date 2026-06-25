import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { auth } from "@/lib/auth";

const PRICE_MAP = {
  starter: {
    priceId: "price_1TlkjJ2LPNK4FLws3FQK8TK9",
    allowedRoles: ["member"],
  },
  pro: {
    priceId: "price_1TlkaW2LPNK4FLws2HlZeC2L",
    allowedRoles: ["member"],
  },
  trainer: {
    priceId: "price_1TlksO2LPNK4FLws9GIhkQZv",
    allowedRoles: ["trainer"],
  },
};

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await req.formData();
    const planKey = formData.get("planKey");

    const selectedPlan = PRICE_MAP[planKey];

    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Invalid subscription plan" },
        { status: 400 }
      );
    }

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!userSession?.user) {
      return NextResponse.redirect(`${origin}/sign-in`, 303);
    }

    const user = userSession.user;
    const userRole = user.role || "member";

    if (!selectedPlan.allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { error: "You are not allowed to subscribe to this plan" },
        { status: 403 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      metadata: {
        planKey,
        priceId: selectedPlan.priceId,
        user_id: user.id,
        user_email: user.email,
        // user_image: user.image,
        user_role: userRole,
      },
      subscription_data: {
        metadata: {
          planKey,
          priceId: selectedPlan.priceId,
          user_id: user.id,
          user_email: user.email,
          // user_image: user.image,
          user_role: userRole,
        },
      },
      mode: "subscription",
      success_url: `${origin}/priceing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/priceing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}