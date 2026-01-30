import { useEffect, useRef, useState } from 'react';

export const useTimer = () => {
  const [targetTime, setTargetTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0); // 초 단위
  const [isActive, setIsActive] = useState(false); // 타이머 실행중
  const [isPaused, setIsPaused] = useState(false); // 타이머 일시정지
  const isPauseUsedRef = useRef(false); // 일시정시 사용 여부
  const timerRef = useRef(null);

  // 타이머
  useEffect(() => {
    if (!isActive || isPaused) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveTime((prev) => prev + 1); // 진행 시간 = 누적 시간 + 흐른 시간
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isActive, isPaused]);

  // 백엔드 전달 데이터
  const saveFocusSession = () => {
    if (activeTime === 0) {
      return;
    }
    const sessionData = {
      targetTime: targetTime,
      activeTime: activeTime,
      isPauseUsed: isPauseUsedRef.current,
    };
    // api 연결 후 수정 예정
    console.log('DB로 전송될 데이터:', sessionData);

    isPauseUsedRef.current = false;
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
