# Authentication Setup Guide

## Overview

This project includes a complete authentication system ready for integration with future user session management.

## Files Created

### 1. **AuthContext** (`src/contexts/AuthContext.js`)

Central authentication context managing:

- `user` - Current logged-in user object
- `isAuthenticated` - Boolean flag for authentication state
- `isLoading` - Loading state during auth checks
- `login(credentials)` - Login function
- `logout()` - Logout function
- `updateUser(userData)` - Update user information

### 2. **ProtectedRoute** (`src/components/ProtectedRoute/ProtectedRoute.jsx`)

Route wrapper that:

- Checks authentication status
- Redirects to login if not authenticated
- Shows loading state while checking auth
- Can be customized with `redirectTo` prop

### 3. **useAuth Hook** (`src/hooks/useAuth.js`)

Custom hook for accessing auth context throughout your app

## How to Use in Components

```jsx
import useAuth from "./hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
```

## Integration with Backend

Update the `login` function in `AuthContext.js` to call your actual authentication API:

```javascript
const login = useCallback(async (credentials) => {
  try {
    setIsLoading(true);
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const userData = await response.json();

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    setIsLoading(false);
  }
}, []);
```

## Protected Routes

All routes under `/dashboard`, `/event/copy`, and `/success` are now protected. Unauthenticated users will be redirected to `/` (login page).

To add more protected routes in `App.jsx`:

```jsx
<Route
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  }
  path="/your-path"
/>
```

## Local Storage

User data is persisted in localStorage under the key `"user"`. This allows users to remain logged in after page refresh until they explicitly logout.

## Future Enhancements

- Add JWT token management
- Implement refresh token logic
- Add session timeout
- Add role-based access control (RBAC)
- Integrate with authentication service (Auth0, Firebase, etc.)
