import { createFocusSession } from '@/services/focusService';
import { useEffect, useRef, useState } from 'react';

export const useTimer = (studyId) => {
  const [targetTime, setTargetTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0); // 초 단위
  const [isActive, setIsActive] = useState(false); // 타이머 실행중
  const [isPaused, setIsPaused] = useState(false); // 타이머 일시정지
  const isPauseUsedRef = useRef(false); // 일시정시 사용 여부
  const timerRef = useRef(null);

  // 타이머
  // setInterval로만 하니까 백그라운드 탭으로 가면 정확도 떨어짐
  useEffect(() => {
    if (!isActive || isPaused) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused]);

  // 백엔드 전달 데이터
  const saveFocusSession = async () => {
    if (activeTime === 0) {
      return null;
    }

    const sessionData = {
      targetTime: targetTime,
      activeTime: activeTime,
      isPauseUsed: isPauseUsedRef.current,
    };

    try {
      const response = await createFocusSession(studyId, sessionData);

      isPauseUsedRef.current = false;

      return response.data;
    } catch (error) {
      console.error('저장 실패:', error);
      throw error;
    }
  };

  return {
    targetTime,
    setTargetTime,
    activeTime,
    setActiveTime,
    isActive,
    setIsActive,
    isPaused,
    setIsPaused,
    isPauseUsedRef,
    saveFocusSession,
  };
};
