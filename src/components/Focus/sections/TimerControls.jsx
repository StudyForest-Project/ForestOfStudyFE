import { TIME } from '@/utils/timerConstants';
import { formatToTwoDigits } from '@/utils/timerUtils';
import { FaRegCircleStop, FaRegCirclePause } from 'react-icons/fa6';
import { IoPlay } from 'react-icons/io5';
import { MdOutlineReplay } from 'react-icons/md';
import styles from './TimerControls.module.css';

export default function TimerControls({
  isActive,
  isPaused,
  timeList,
  inputHours,
  inputMinutes,

  setInputHours,
  setInputMinutes,
  setTargetTime,
  setActiveTime,
  setIsActive,
  setIsPaused,
  setInputMode,

  isPauseUsedRef,
  updateTimeList,
  saveFocusSession,
  updateTimerValues,
}) {
  // 이전 설정 시간 클릭
  const handleTimeSelect = (label) => {
    const [hours, minutes] = label.split(':');
    setInputHours(hours);
    setInputMinutes(minutes);

    updateTimerValues(hours, minutes);
  };

  // 시작 버튼
  const handleStart = () => {
    const hours = Number(inputHours) || 0;
    const minutes = Number(inputMinutes) || 0;
    const targetTotalMinutes = hours * TIME.MINUTES_IN_HOUR + minutes;

    if (targetTotalMinutes === 0) return;

    setTargetTime(targetTotalMinutes);
    setActiveTime(0);
    isPauseUsedRef.current = false;

    const newLabel = `${formatToTwoDigits(hours)}:${formatToTwoDigits(minutes)}`;
    updateTimeList(targetTotalMinutes, newLabel);

    setIsActive(true);
    setIsPaused(false);
    setInputMode(false);
  };

  // 일시정지 버튼
  const handlePause = () => {
    setIsPaused(!isPaused);

    if (isPaused || isPauseUsedRef.current) {
      return;
    }
    // 일시정지 첫 사용 시 체크
    isPauseUsedRef.current = true;
  };

  // 재시작 버튼
  const handleResume = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  // 종료 버튼 -> 멈춘 상태 유지
  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);

    saveFocusSession();
  };

  // 리셋 버튼
  const handleReset = () => {
    if (isActive && !isPaused) return;

    if (isPaused) {
      saveFocusSession();
    }

    setInputHours('');
    setInputMinutes('');
    setTargetTime(0);
    setActiveTime(0);

    setIsActive(false);
    setIsPaused(false);
    setInputMode(null);
    isPauseUsedRef.current = false;
  };

  return (
    <div className={styles.timerControls}>
      <div className={isActive ? styles.timeListHidden : styles.timeList}>
        {timeList.map((time) => (
          <button
            className={styles.timeSelectButton}
            key={time.minutes}
            onClick={() => {
              handleTimeSelect(time.label);
            }}
          >
            {time.label}
          </button>
        ))}
      </div>

      <div className={styles.timerButtons}>
        <div className={styles.leftButton}>
          {isActive ? (
            <button
              className={styles.iconOnlyButton}
              onClick={isPaused ? handleResume : handlePause}
            >
              {isPaused ? <IoPlay /> : <FaRegCirclePause />}
            </button>
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>

        <div className={styles.centerButton}>
          {!isActive ? (
            <button
              className={styles.startButton}
              onClick={handleStart}
              disabled={
                (Number(inputHours) || 0) + (Number(inputMinutes) || 0) === 0
              }
            >
              <IoPlay /> <span>Start!</span>
            </button>
          ) : (
            <button className={styles.stopButton} onClick={handleStop}>
              <FaRegCircleStop /> <span>Stop!</span>
            </button>
          )}
        </div>

        <div className={styles.rightButton}>
          <button
            className={styles.iconOnlyButton}
            onClick={handleReset}
            disabled={isActive && !isPaused}
          >
            <MdOutlineReplay />
          </button>
        </div>
      </div>
    </div>
  );
}
