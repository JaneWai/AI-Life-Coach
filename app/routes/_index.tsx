import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChatInterface from "~/components/ChatInterface";
import WelcomeHero from "~/components/WelcomeHero";

export const loader = async () => {
  return json({
    title: "AI Life Coach - Your Personal Guide to Success"
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <WelcomeHero title={data.title} />
      <div className="container mx-auto px-4 py-8">
        <ChatInterface />
      </div>
    </main>
  );
}
