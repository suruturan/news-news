import NewsList from '../features/news-list/ui/NewsList';

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">News</h1>
        <NewsList />
      </div>
    </main>
  );
}
