import { Link, Outlet, useParams } from 'react-router';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
import { checkAccess } from '@/services';
import styles from './StudyLayout.module.css';
import logo from '@/assets/logo.png';

export const StudyLayout = () => {
  const { studyId } = useParams();
  const { verifiedStudyId, verifyStudy } = useAuthStore();

  useEffect(() => {
    if (!studyId) return;
    if (verifiedStudyId === studyId) return;

    const restoreAuth = async () => {
      try {
        const ok = await checkAccess(studyId);
        if (ok) {
          verifyStudy(studyId);
        }
      } catch {}
    };

    restoreAuth();
  }, [studyId, verifiedStudyId, verifyStudy]);

  return (
    <div className={styles.page}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="공부의 숲 로고" />
      </Link>

      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};
