import { getSiteContent } from "@/data/content";
import ClientPage from "@/components/ClientPage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

  return <ClientPage content={content} />;
}
