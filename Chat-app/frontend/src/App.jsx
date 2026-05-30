import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import { useThemeStore } from "./store/useThemeStore.js";
import PageLoader from "./components/PageLoader.jsx";

import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'

const App = () => {

  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;
   const { theme } = useThemeStore();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  // const { isLoading, authUser } = useAuthUser();
 

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme="dark">

      <Routes>

        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path='/signup'
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path='/notification'
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />

        <Route
          path='/call'
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />

        <Route
          path='/chat'
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>

      <Toaster />

    </div>
  );
};

export default App;