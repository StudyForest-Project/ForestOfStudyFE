import { Routes, Route } from 'react-router';
import { StudyLayout } from './layouts/StudyLayout';
import { RootLayout } from './layouts/RootLayout';
import { GlobalToastProvider } from './providers/GlobalToastContainer';

import {
  HomePage,
  StudyCreatePage,
  StudyPage,
  TodayHabitPage,
  TodayFocusPage,
  NotFoundPage,
} from './pages';

function App() {
  return (
    <>
      <GlobalToastProvider />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/new" element={<StudyCreatePage />} />
        </Route>

        <Route path="/studies/:id" element={<StudyLayout />}>
          <Route index element={<StudyPage />} />
          <Route path="habit" element={<TodayHabitPage />} />
          <Route path="focus" element={<TodayFocusPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
