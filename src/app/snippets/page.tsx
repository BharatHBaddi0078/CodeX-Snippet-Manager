import { UserButton } from '@clerk/nextjs';
import CodeSnippetManager from '@/components/CodeSnippetManager';

export default function SnippetsPage() {
  return (
    <div className="min-h-screen">
      <CodeSnippetManager />
    </div>
  );
}
