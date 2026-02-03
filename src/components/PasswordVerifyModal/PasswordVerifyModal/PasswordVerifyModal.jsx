import { useState } from 'react';
import { useStudyAuth } from '@/hooks/useStudyAuth';
import { showWarningToast } from '@/utils/toast';
import { PrimaryButton } from '@/components/PrimaryButton';
import eyeToggle from '@/assets/icons/ic_eye_toggle.svg';
import styles from './PasswordVerifyModal.module.css';

/* 스터디 비밀번호 검증 모달 */
export const PasswordVerifyModal = ({
  studyId,
  studyTitle,
  actionText,
  onClose, // 모달 닫기 콜백
  onSuccess, // 비밀번호 검증 성공 후 실행할 콜백
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /* 비밀번호 검증 로직 */
  const { verifyStudyPassword } = useStudyAuth(studyId);

  /* 비밀번호 검증 버튼 클릭 핸들러 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyStudyPassword(password);
      onSuccess();
      onClose();
    } catch {
      showWarningToast('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h1 className={styles.title}>{studyTitle}</h1>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            나가기
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <h2 className={styles.subTitle}>권한이 필요해요!</h2>

          <label htmlFor="password" className={styles.inputLabel}>
            비밀번호
          </label>

          <div className={styles.inputWrapper}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordInput}
              autoFocus
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src={eyeToggle} alt="비밀번호 표시 토글" />
            </button>
          </div>

          <PrimaryButton type="submit" className={styles.submitButton}>
            {actionText}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};
