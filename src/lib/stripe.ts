// SERVER-ONLY. Do not import from client components.
import Stripe from "stripe";

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
export const STRIPE_PREMIUM_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID;

/** True when a checkout can actually be created. */
export const isStripeConfigured = Boolean(STRIPE_SECRET_KEY && STRIPE_PREMIUM_PRICE_ID);

export const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;
