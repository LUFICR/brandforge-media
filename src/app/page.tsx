import { getSiteContent } from "@/data/content";
import ClientPage from "@/components/ClientPage";

export default function Home() {
  const content = getSiteContent();

  return <ClientPage content={content} />;
}
