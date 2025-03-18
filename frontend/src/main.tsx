import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AuthProvider from './providers/AuthProvider.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import useAuth from './hooks/use-auth.ts';
import FavoriteProvider from './providers/FavoriteProvider.tsx';
import AppliedProvider from './providers/AppliedProvider.tsx';

const AppContent = () => {
  const auth = useAuth();

  return (
    <FavoriteProvider userId={auth?.user?.id}>
      <AppliedProvider userId={auth?.user?.id}>
        <App />
        <Toaster />
      </AppliedProvider>
    </FavoriteProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <AppContent />
  </AuthProvider>,
);
