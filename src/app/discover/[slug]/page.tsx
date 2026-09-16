import { easterEggs } from "@/data/catalog";
import { EggDetails } from "@/components/store/EggDetails";

export function generateStaticParams() {
  return easterEggs.map((egg) => ({ slug: egg.slug }));
}

export default async function EggPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EggDetails slug={slug} />;
}
