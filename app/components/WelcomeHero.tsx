export default function WelcomeHero({ title }: { title: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Your personal AI companion for guidance, support, and motivation. Here to help you navigate life's challenges and achieve your goals.
          </p>
        </div>
      </div>
    </div>
  );
}
