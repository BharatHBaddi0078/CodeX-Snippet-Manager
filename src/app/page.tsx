
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">CodeX Snippet Manager</h1>
        <p className="mb-6 text-gray-600">A modern Next.js app with Clerk authentication and code snippet management.</p>
        <div className="flex flex-col gap-3 mb-6">
          <SignedOut>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/snippets">
              <Button>Go to Snippet Manager</Button>
            </Link>
            <div className="flex justify-center mt-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
        <div className="text-xs text-gray-400">Built with Next.js, Clerk, and Tailwind CSS</div>
      </Card>
    </div>
  );
}
