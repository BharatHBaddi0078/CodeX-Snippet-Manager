import { UserButton } from '@clerk/nextjs';
// Make sure the path is correct; adjust if needed:
import SnippetManager from '@/components/SnippetManager';
// If the file does not exist, create 'src/components/SnippetManager.tsx' or correct the path.

export default function SnippetsPage() {
  // Clerk's auth() can be used for server-side protection if needed
  // const { userId } = auth();
  // if (!userId) return <div>Not authenticated</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Code Snippets</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <SnippetManager />
    </div>
  );
}
