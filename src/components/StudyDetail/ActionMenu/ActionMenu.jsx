import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PasswordVerifyModal } from '../../PasswordVerifyModal/PasswordVerifyModal';
import { shareStudy } from '@/utils/shareStudy';
import { deleteStudy } from '@/services/studyService';
import { showSuccessToast } from '@/utils/toast';
import styles from './ActionMenu.module.css';
import useCrateStudyStore from '@/stores/useStudyFormStore';

export const ActionMenu = ({ studyId, study }) => {
  const navigate = useNavigate();
  const setFormData = useCrateStudyStore((s) => s.setFormData);
  const [currentAction, setCurrentAction] = useState(null);

  if (!study) return null;
  console.log(study);
  const handleActionClick = async (type) => {
    /* 공유하기는 비밀번호 검증 없이 바로 실행 */
    if (type === 'share') {
      const result = await shareStudy();

      if (result.type === 'share') {
        showSuccessToast('공유가 완료되었습니다.');
      }

      if (result.type === 'clipboard') {
        showSuccessToast('링크가 복사되었습니다.');
      }

      return;
    }

    setCurrentAction(type); //  edit | delete
  };

  /* 비밀번호 검증 성공 후 실행되는 액션 처러 */
  const handleVerifiedAction = async () => {
    if (currentAction === 'edit') {
      const studyData = {
        nickname: study.nickname,
        title: study.title,
        description: study.description,
        backgroundImage: study.backgroundImage,
      };

      setFormData(studyData);
      sessionStorage.setItem(`studyForm:${studyId}`, JSON.stringify(studyData));
      navigate(`/${studyId}/studyModify`); // 수정 페이지로 이동
    }

    if (currentAction === 'delete') {
      await deleteStudy(studyId); // 스터디 삭제 API 호출
      navigate('/'); // 홈으로 이동
    }

    setCurrentAction(null);
  };

  const actionText =
    currentAction === 'edit' ? '수정하러 가기' : '스터디 삭제하기';

  return (
    <>
      <div className={styles.actionMenu}>
        <button onClick={() => handleActionClick('share')}>공유하기</button>
        <span className={styles.separator}>|</span>
        <button onClick={() => handleActionClick('edit')}>수정하기</button>
        <span className={styles.separator}>|</span>
        <button
          className={styles.deleteButton}
          onClick={() => handleActionClick('delete')}
        >
          스터디 삭제하기
        </button>
      </div>

      {currentAction && (
        <PasswordVerifyModal
          studyId={studyId}
          studyTitle={study.title}
          actionText={actionText}
          onClose={() => setCurrentAction(null)}
          onSuccess={handleVerifiedAction}
        />
      )}
    </>
  );
};
