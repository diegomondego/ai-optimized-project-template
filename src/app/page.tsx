/**
 * page.tsx — Root page (marketing home)
 *
 * This is the entry-point page (/). It should be thin:
 * - Import a feature component or section component
 * - Pass server-fetched data as props
 * - Never contain business logic directly
 */

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        [Your Project Name]
      </h1>
      <p className="mt-4 text-lg text-gray-600">[Your tagline]</p>
    </main>
  );
}
