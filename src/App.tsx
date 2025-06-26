import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nProvider } from './contexts/I18nContext';
import { AuthProvider } from './contexts/AuthContext';
import { SchoolProvider } from './contexts/SchoolContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import SchoolDetails from './pages/SchoolDetails';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import Classes from './pages/Classes';
import ClassDetails from './pages/ClassDetails';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import Teachers from './pages/Teachers';
import TeacherDetails from './pages/TeacherDetails';
import Logs from './pages/Logs';
import ErrorPage from './pages/ErrorPage';
import Loader from './components/Loader';
import { useScrollReset } from "@/hooks/useScrollReset";

const queryClient = new QueryClient();

function App() {
  // Réinitialiser le scroll lors des changements de page
  useScrollReset();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <SchoolProvider>
            <Router>
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                  <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                  <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                  <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

                  {/* Private Routes */}
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/schools" element={<PrivateRoute><Schools /></PrivateRoute>} />
                  <Route path="/schools/:id" element={<PrivateRoute><SchoolDetails /></PrivateRoute>} />
                  <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                  <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  <Route path="/subscriptions" element={<PrivateRoute><Subscription /></PrivateRoute>} />
                  <Route path="/games" element={<PrivateRoute><Games /></PrivateRoute>} />
                  <Route path="/games/:id" element={<PrivateRoute><GameDetails /></PrivateRoute>} />
                  <Route path="/classes" element={<PrivateRoute><Classes /></PrivateRoute>} />
                  <Route path="/classes/:id" element={<PrivateRoute><ClassDetails /></PrivateRoute>} />
                  <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
                  <Route path="/students/:id" element={<PrivateRoute><StudentDetails /></PrivateRoute>} />
                  <Route path="/teachers" element={<PrivateRoute><Teachers /></PrivateRoute>} />
                  <Route path="/teachers/:id" element={<PrivateRoute><TeacherDetails /></PrivateRoute>} />
                  <Route path="/logs" element={<PrivateRoute><Logs /></PrivateRoute>} />

                  {/* Error Page */}
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Suspense>
            </Router>
          </SchoolProvider>
        </AuthProvider>
      </I18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
