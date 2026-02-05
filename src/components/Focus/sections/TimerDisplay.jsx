import { useEffect } from 'react';
import { formatToTwoDigits } from '@/utils/timerUtils';
import { LuAlarmClock } from 'react-icons/lu';
import styles from './TimerDisplay.module.css';
import clsx from 'clsx';

export default function TimerDisplay({
  isInputMode,
  inputHours,
  inputMinutes,
  timeSign,
  isActive,
  formattedTime,
  hourInputRef,
  minuteInputRef,
  inputContainerRef,
  handleInputChange,
  setInputMode,
}) {
  // 상단에 입력 시간 표시
  const showTargetTime = () => {
    const hours = inputHours ? formatToTwoDigits(inputHours) : '00';
    const minutes = inputMinutes ? formatToTwoDigits(inputMinutes) : '00';

    if (hours === '00' && minutes === '00') {
      return '시간 설정';
    }

    return `${hours}:${minutes}`;
  };

  // 입력창 열기
  const startInputMode = (target) => {
    if (isActive) {
      return;
    }
    setInputMode(target);
  };

  useEffect(() => {
    if (!isInputMode) {
      return;
    }

    const targetRef = isInputMode === 'hour' ? hourInputRef : minuteInputRef;
    targetRef.current?.focus();
  }, [isInputMode, hourInputRef, minuteInputRef]);

  // 타이머 색상 상태
  const isMinus = isActive && timeSign === '-';

  const isWarning =
    isActive &&
    !isMinus &&
    formattedTime.hours === '00' &&
    formattedTime.minutes === '00';

  return (
    <div className={styles.timerDisplay}>
      <div className={styles.timeBadge}>
        <LuAlarmClock />
        {showTargetTime()}
      </div>

      <div
        className={clsx(styles.timerContainer, {
          [styles.minus]: isMinus,
          [styles.warning]: isWarning,
        })}
        ref={inputContainerRef}
      >
        {isInputMode ? (
          <div className={styles.displayTime}>
            <span className={styles.signPlaceholder}></span>
            <input
              className={styles.timerInput}
              type="number"
              name="hours"
              ref={hourInputRef}
              value={inputHours}
              onChange={handleInputChange}
              placeholder="00"
            />
            <span className={styles.separator}>:</span>
            <input
              className={styles.timerInput}
              type="number"
              name="minutes"
              ref={minuteInputRef}
              value={inputMinutes}
              onChange={handleInputChange}
              placeholder="00"
            />
            <span className={styles.fixedSeconds}>:00</span>
          </div>
        ) : (
          <div className={styles.displayTime}>
            <span className={styles.sign}>{timeSign}</span>
            <span
              className={styles.timeUnit}
              onClick={() => !isActive && startInputMode('hour')}
            >
              {formattedTime.hours}
            </span>
            <span className={styles.separator}>:</span>
            <span
              className={styles.timeUnit}
              onClick={() => !isActive && startInputMode('minute')}
            >
              {formattedTime.minutes}
            </span>
            <span className={styles.seconds}>:{formattedTime.seconds}</span>
          </div>
        )}
      </div>
    </div>
  );
}
