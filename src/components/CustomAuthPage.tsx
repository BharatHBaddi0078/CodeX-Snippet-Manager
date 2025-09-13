import { SignIn, SignUp } from '@clerk/nextjs';
import { TextureCard, TextureCardHeader, TextureCardContent, TextureCardTitle, TextureSeparator } from '@/components/TextureCard';
import { TextureButton } from '@/components/TextureButton';
import { TextureInput } from '@/components/TextureInput';
import Link from 'next/link';
import { useState } from 'react';
import { Github } from 'lucide-react';

interface AuthPageProps {
  mode: 'sign-in' | 'sign-up';
}

export default function CustomAuthPage({ mode }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const isSignUp = mode === 'sign-up';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <TextureCard className="w-full max-w-md">
        <TextureCardHeader className="text-center space-y-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto w-fit">
            <Github className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-2">
            <TextureCardTitle className="text-2xl font-bold">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </TextureCardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp 
                ? 'Please fill in the details to get started.' 
                : 'Please sign in to your account to continue.'
              }
            </p>
          </div>
        </TextureCardHeader>

        <TextureCardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <TextureButton
              variant="secondary"
              className="w-full"
              onClick={() => {
                // Clerk will handle this automatically when configured
                setIsLoading(true);
              }}
            >
              <Github className="h-4 w-4" />
              Continue with GitHub
            </TextureButton>
            
            <TextureButton
              variant="secondary"
              className="w-full"
              onClick={() => setIsLoading(true)}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </TextureButton>
          </div>

          <div className="relative">
            <TextureSeparator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white dark:bg-gray-900 px-3 text-sm text-gray-500">or</span>
            </div>
          </div>

          {/* Use Clerk Components for actual functionality */}
          <div className="space-y-4">
            {isSignUp ? (
              <SignUp 
                path="/sign-up" 
                routing="path" 
                signInUrl="/sign-in"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none bg-transparent p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "hidden",
                    dividerRow: "hidden",
                    formButtonPrimary: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium py-3",
                  },
                }}
              />
            ) : (
              <SignIn 
                path="/sign-in" 
                routing="path" 
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none bg-transparent p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "hidden",
                    dividerRow: "hidden",
                    formButtonPrimary: "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium py-3",
                  },
                }}
              />
            )}
          </div>
        </TextureCardContent>

        <div className="p-6 pt-0">
          <TextureSeparator />
          <div className="pt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <Link 
                href={isSignUp ? '/sign-in' : '/sign-up'} 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </Link>
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Secured by <span className="font-medium">Clerk</span>
            </p>
          </div>
        </div>
      </TextureCard>
    </div>
  );
}