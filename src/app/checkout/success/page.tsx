import { StoreHeader } from "@/components/store/StoreChrome";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="page-shell">
      <StoreHeader />
      <div className="panel-card max-w-xl">
        <p className="eyebrow">Order received</p>
        <h1 className="display-title mt-2 text-4xl">The studio will pack it carefully.</h1>
        <p className="mt-4 leading-7">
          Thank you. If Stripe is connected, payment is confirmed there. Otherwise this was a local
          demo order saved with the apartment.
        </p>
        <Link className="ink-button-solid mt-6 inline-block" href="/">
          Wander again
        </Link>
      </div>
    </main>
  );
}
