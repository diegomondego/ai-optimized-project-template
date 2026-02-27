/**
 * billing.service.ts
 *
 * Business logic for the billing feature (Stripe integration).
 * This service does not know about HTTP or UI — it only accepts and returns typed data.
 */

import type { PlanTier, Subscription } from "./billing.types";
import { BillingError } from "./billing.types";

// ---------------------------------------------------------------------------
// Stripe client stub — replace with: import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// ---------------------------------------------------------------------------

/**
 * Retrieve the active subscription for a user.
 * Returns null if the user has no active subscription (free tier).
 */
export async function getSubscription(userId: string): Promise<Subscription | null> {
  // TODO: query your database for the user's subscription
  void userId;
  return null;
}

/**
 * Create a Stripe checkout session and return the redirect URL.
 * The user is redirected to this URL to complete payment.
 */
export async function createCheckoutSession(
  userId: string,
  plan: PlanTier
): Promise<{ url: string }> {
  if (plan === "free") {
    throw new BillingError("Cannot create a checkout session for the free plan.", "PlanNotFound");
  }

  // TODO: call stripe.checkout.sessions.create({ ... })
  void userId;

  return { url: "https://checkout.stripe.com/placeholder" };
}

/**
 * Handle an incoming Stripe webhook event.
 * Called by the API route handler after signature verification.
 */
export async function handleWebhookEvent(event: {
  type: string;
  data: unknown;
}): Promise<void> {
  switch (event.type) {
    case "customer.subscription.updated":
      // TODO: update subscription in database
      break;
    case "customer.subscription.deleted":
      // TODO: downgrade user to free plan
      break;
    case "invoice.payment_failed":
      // TODO: notify user and update subscription status
      break;
    default:
      // Unhandled event — log and ignore
      console.log(`[billing] unhandled webhook: ${event.type}`);
  }
}

export const billingService = { getSubscription, createCheckoutSession, handleWebhookEvent };
