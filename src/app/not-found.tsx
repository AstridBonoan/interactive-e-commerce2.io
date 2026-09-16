import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="panel-card max-w-lg">
        <h1 className="display-title text-4xl">Wrong door.</h1>
        <p className="mt-3">That room is not in this apartment.</p>
        <Link className="ink-button-solid mt-5 inline-block" href="/">
          Back to the loft
        </Link>
      </div>
    </main>
  );
}
