/**
 * billing.types.ts
 *
 * TypeScript types for the billing feature.
 * Billing is a separate feature module — auth types never bleed in here.
 * If a userId reference is needed, use string (the shared primitive), not the User type.
 */

export type PlanTier = "free" | "pro" | "enterprise";

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanTier;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "paused";

export interface Invoice {
  id: string;
  subscriptionId: string;
  amount: number; // in cents
  currency: string;
  status: "draft" | "open" | "paid" | "void" | "uncollectible";
  dueDate: Date;
  paidAt: Date | null;
}

export class BillingError extends Error {
  constructor(
    message: string,
    public readonly code: "PaymentFailed" | "SubscriptionNotFound" | "PlanNotFound"
  ) {
    super(message);
    this.name = "BillingError";
  }
}
