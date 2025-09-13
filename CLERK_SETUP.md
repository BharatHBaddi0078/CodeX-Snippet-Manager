# Setup GitHub OAuth with Clerk

To enable GitHub authentication in your app, follow these steps:

## 1. Configure GitHub OAuth in Clerk Dashboard

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to "User & Authentication" → "Social Connections"
4. Click "Add connection" and select "GitHub"
5. Enable the GitHub provider

## 2. GitHub OAuth App Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: CodeX Snippet Manager
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: Copy from Clerk dashboard (usually like `https://your-clerk-app.clerk.accounts.dev/v1/oauth_callback`)
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**
6. Paste them in your Clerk dashboard's GitHub configuration

## 3. Update Environment Variables (Optional)

Your current `.env.local` file already has the required Clerk keys:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 4. Social Providers Available

The updated sign-in/sign-up pages now support:
- ✅ GitHub OAuth
- ✅ Google OAuth  
- ✅ Email/Password authentication
- ✅ Modern texture card design

## 5. Features Included

- 🎨 Modern texture card UI inspired by Cult UI
- 🔒 Clerk authentication with social providers
- 📱 Responsive design
- 🌙 Dark mode support
- ✨ Gradient backgrounds and smooth animations
- 🔄 Loading states and error handling

## 6. Usage

Users can now:
- Sign up/in with GitHub (once configured)
- Sign up/in with Google (once configured)  
- Sign up/in with email/password
- Access the snippets manager after authentication
- Enjoy a beautiful, modern authentication experience