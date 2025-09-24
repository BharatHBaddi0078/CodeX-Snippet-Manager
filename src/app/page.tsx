
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center space-y-8">
        <BackgroundGradient className="rounded-[22px] w-full max-w-md">
          <Card className="w-full text-center border-0 bg-white dark:bg-zinc-900">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-black">CodeX Snippet Manager</h1>
            <p className="mb-6 text-muted-foreground">A modern Next.js app with Clerk authentication and code snippet management.</p>
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
            <div className="text-xs text-muted-foreground">Built with Next.js, Clerk, and Tailwind CSS</div>
          </Card>
        </BackgroundGradient>
      </div>
    </div>
  );
}
