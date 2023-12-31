import { Nav } from './components/Navigation/nav';
import { toTask, toTasks, toAutor } from './routers';
import { TaskPage } from './to-do-list/TaskPage/task';
import { TasksPage } from './to-do-list/TasksPage/tasksPage';
import { AuthorPage } from './to-do-list/AuthorPage/author';
import { Footer } from './components/Footer/footer';
import { LoginMenu } from './components/UserMenu/LoginMenu';
import { SignupMenu } from './components/UserMenu/SignUpMenu';
import CookieConsent from 'react-cookie-consent';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import useTasksStore from './utils/taskStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

export default function App() {
  const { showLoginModal, showSignupModal } = useTasksStore();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <HashRouter>
        <Nav />
        {showSignupModal && <SignupMenu />}
        {showLoginModal && <LoginMenu />}
        <Routes>
          <Route
            path={toTask()}
            element={<TaskPage />}
          />
          <Route
            path={toTasks()}
            element={<TasksPage />}
          />
          <Route
            path={toAutor()}
            element={<AuthorPage />}
          />
          <Route
            path=''
            element={
              <Navigate
                to={toTasks()}
                replace
              />
            }
          />
        </Routes>
        <Footer />
        <CookieConsent enableDeclineButton containerClasses='!bg-black' contentClasses='!bg-black' buttonWrapperClasses='!bg-black'>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
