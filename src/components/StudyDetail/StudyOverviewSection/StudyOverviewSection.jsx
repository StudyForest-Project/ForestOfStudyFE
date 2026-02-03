import { useNavigate } from 'react-router';
import { useState } from 'react';
import { NavButton } from '@/components';
import { PointBadge } from '@/components/PointBadge';
import { PasswordVerifyModal } from '@/components/PasswordVerifyModal/PasswordVerifyModal';
import { useStudyAuth } from '@/hooks/useStudyAuth';
import styles from './StudyOverviewSection.module.css';

/* 버튼 타입별 이동 경로와 문구 */
const ACTION_CONFIG = {
  habit: {
    label: '오늘의 습관',
    actionText: '오늘의 습관으로 가기',
    path: 'habit',
  },
  focus: {
    label: '오늘의 집중',
    actionText: '오늘의 집중으로 가기',
    path: 'focus',
  },
};

export const StudyOverviewSection = ({ study }) => {
  const navigate = useNavigate();
  const { isVerified } = useStudyAuth(study?.id);
  /* 현재 선택된 액션 (habit | focus), null이면 모달 닫힘 */
  const [currentAction, setCurrentAction] = useState(null);

  if (!study) return null;

  const handleActionClick = (type) => {
    if (isVerified) {
      navigate(ACTION_CONFIG[type].path);
      return;
    }
    setCurrentAction(type);
  };

  /* 비밀번호 검증 시 해당 액션 페이지로 이동 */
  const handleVerifiedSuccess = () => {
    navigate(ACTION_CONFIG[currentAction].path);
    setCurrentAction(null);
  };

  return (
    <>
      <div className={styles.top}>
        <h1 className={styles.studyTitle}>{study.title}</h1>

        {/* 페이지 이동 버튼 */}
        <div className={styles.nav}>
          {Object.entries(ACTION_CONFIG).map(([key, { label }]) => (
            <NavButton
              key={key}
              as="button"
              onClick={() => handleActionClick(key)}
            >
              {label}
            </NavButton>
          ))}
        </div>
      </div>

      {/* 스터디 소개 부분 */}
      <div className={styles.introSection}>
        <p className={styles.introTitle}>소개</p>
        <p className={styles.introText}>{study.description}</p>
      </div>

      {/* 총 포인트 */}
      <PointBadge
        totalPoint={study.totalPoint}
        label
        className={styles.totalPoint}
      />

      {/* 비밀번호 검증 모달 */}
      {currentAction && (
        <PasswordVerifyModal
          studyId={study.id}
          studyTitle={study.title}
          actionText={ACTION_CONFIG[currentAction].actionText}
          onClose={() => setCurrentAction(null)}
          onSuccess={handleVerifiedSuccess}
        />
      )}
    </>
  );
};
