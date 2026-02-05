import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import { TIME, LIMITS } from '@/utils/timerConstants';
import {
  validateRange,
  getTimeUnits,
  formatDisplayTime,
} from '@/utils/timerUtils';
import { useClickOutside, useEnterKey } from '@/hooks/useTimerInputControl';
import { useTimer } from '@/hooks/useTimer';

import TimerDisplay from '@/components/Focus/sections/TimerDisplay';
import TimerControls from '@/components/Focus/sections/TimerControls';
import styles from './Timer.module.css';

export default function Timer() {
  const { studyId, timeList, onUpdateTimeList, onSaveSuccess } =
    useOutletContext();

  const [isInputMode, setInputMode] = useState(null); // 타이머 입력 모드 : null, "hour", "minute"
  const [inputHours, setInputHours] = useState(''); // 시간 입력
  const [inputMinutes, setInputMinutes] = useState(''); // 분 입력

  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);
  const inputContainerRef = useRef(null);

  const {
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
  } = useTimer(studyId);

  // 입력값 변경 감지
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (isNaN(value)) {
      return;
    }

    const isHourField = name === 'hours';
    const updateInputState = isHourField ? setInputHours : setInputMinutes;
    const maxValueLimit = isHourField ? LIMITS.MAX_HOURS : LIMITS.MAX_MINUTES;

    const inputValue =
      value.length > LIMITS.INPUT_LIMIT
        ? value.slice(0, LIMITS.INPUT_LIMIT)
        : value;

    if (inputValue === '') {
      updateInputState('');
      isHourField
        ? updateTimerValues(0, inputMinutes)
        : updateTimerValues(inputHours, 0);
      return;
    }

    const rangeFixedValue = validateRange(inputValue, maxValueLimit);
    const finalValue = String(rangeFixedValue);
    updateInputState(finalValue);

    isHourField
      ? updateTimerValues(rangeFixedValue, inputMinutes)
      : updateTimerValues(inputHours, rangeFixedValue);
  };

  // 설정 시간 초 단위로(타이머용)
  const updateTimerValues = (hours, minutes) => {
    if (!isActive) {
      const totalMinutes =
        (Number(hours) || 0) * TIME.MINUTES_IN_HOUR + (Number(minutes) || 0);
      setTargetTime(totalMinutes);
      setActiveTime(0);
    }
  };

  // 입력창 닫기 (바깥 클릭 + 엔터)
  const closeInput = () => {
    if (inputHours === '') setInputHours('00');
    if (inputMinutes === '') setInputMinutes('00');
    setInputMode(null);
  };

  useClickOutside(inputContainerRef, isInputMode, closeInput);
  useEnterKey(isInputMode, closeInput);

  const leftTimeSeconds =
    targetTime > 0 ? targetTime * TIME.SECONDS_IN_MINUTE - activeTime : 0;
  const timeUnits = getTimeUnits(leftTimeSeconds);
  const formattedTime = formatDisplayTime(timeUnits);
  const timeSign = leftTimeSeconds < 0 ? '-' : '';

  // 데이터 저장
  const handleSaveFocus = async () => {
    try {
      const result = await saveFocusSession();

      if (result && result.totalPoint !== undefined) {
        onSaveSuccess(result.totalPoint);
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.focusContainer}>
      <h3 className={styles.title}>오늘의 집중</h3>

      <TimerDisplay
        isInputMode={isInputMode}
        inputHours={inputHours}
        inputMinutes={inputMinutes}
        timeSign={timeSign}
        isActive={isActive}
        formattedTime={formattedTime}
        hourInputRef={hourInputRef}
        minuteInputRef={minuteInputRef}
        inputContainerRef={inputContainerRef}
        handleInputChange={handleInputChange}
        setInputMode={setInputMode}
      />

      <TimerControls
        isActive={isActive}
        isPaused={isPaused}
        timeList={timeList}
        inputHours={inputHours}
        inputMinutes={inputMinutes}
        setInputHours={setInputHours}
        setInputMinutes={setInputMinutes}
        setTargetTime={setTargetTime}
        setActiveTime={setActiveTime}
        setIsActive={setIsActive}
        setIsPaused={setIsPaused}
        setInputMode={setInputMode}
        isPauseUsedRef={isPauseUsedRef}
        updateTimeList={onUpdateTimeList}
        saveFocusSession={handleSaveFocus}
        updateTimerValues={updateTimerValues}
      />
    </div>
  );
}
