import { Routes, Route, Navigate } from 'react-router';
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

import Timer from './components/Focus/Timer';
import PointStats from './components/Focus/PointStats';
import FocusStats from './components/Focus/FocusStats';

function App() {
  return (
    <>
      <GlobalToastProvider />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/studyCreate" element={<StudyCreatePage />} />
          <Route path="/:studyId/studyModify" element={<StudyCreatePage />} />
        </Route>

        <Route path="/studies/:studyId" element={<StudyLayout />}>
          <Route index element={<StudyPage />} />
          <Route path="habit" element={<TodayHabitPage />} />
          <Route path="focus" element={<TodayFocusPage />}>
            <Route index element={<Navigate to="timer" replace />} />
            <Route path="timer" element={<Timer />} />
            <Route path="focus-stats" element={<FocusStats />} />
            <Route path="point-stats" element={<PointStats />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
