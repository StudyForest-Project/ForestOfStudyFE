import { LIMITS, TIME } from './timerConstants';

// 숫자를 두자리 형식 문자열로 변환 (1 -> '01')
export const formatToTwoDigits = (num) => String(num).padStart(2, '0');

// 입력값 유효범위 설정
export const validateRange = (value, max) => {
  const numericValue = Number(value) || 0;
  const validatedValue = Math.max(0, Math.min(max, numericValue));

  return String(validatedValue);
};

// 전체 초 -> 시, 분, 초 단위
export const getTimeUnits = (totalSeconds) => {
  const absSeconds = Math.abs(totalSeconds);
  return {
    hours: Math.floor(absSeconds / TIME.SECONDS_IN_HOUR),
    minutes: Math.floor(
      (absSeconds % TIME.SECONDS_IN_HOUR) / TIME.SECONDS_IN_MINUTE,
    ),
    seconds: absSeconds % TIME.SECONDS_IN_MINUTE,
  };
};

// 시, 분, 초 -> 문자열로 뱐환
export const formatDisplayTime = (units) => {
  return {
    hours: formatToTwoDigits(units.hours),
    minutes: formatToTwoDigits(units.minutes),
    seconds: formatToTwoDigits(units.seconds),
  };
};

// 상단에 입력 시간 표시
export const showTargetTime = (inputHours, inputMinutes) => {
  const hours = inputHours ? formatToTwoDigits(inputHours) : '00';
  const minutes = inputMinutes ? formatToTwoDigits(inputMinutes) : '00';

  if (hours === '00' && minutes === '00') {
    return '시간 설정';
  }

  return `${hours}:${minutes}`;
};

// 설정 시간 리스트 업데이트
export const updateTimeList = (prevList, minutes, label) => {
  return [
    { minutes, label },
    ...prevList.filter((i) => i.minutes !== minutes),
  ].slice(0, LIMITS.RECENT_TIMES_LIMIT);
};

// 분 단위를 'n시간 m분' 형식으로 변환
export const formatActiveTime = (totalMinutes) => {
  if (!totalMinutes || totalMinutes <= 0) return '0분';

  const hours = Math.floor(totalMinutes / TIME.MINUTES_IN_HOUR);
  const minutes = totalMinutes % TIME.MINUTES_IN_HOUR;

  if (hours === 0) {
    return `${minutes}분`;
  }

  return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
};

// 오늘 요일
export const getTodayName = (weekDays) => {
  const todayIndex = new Date().getDay();
  return weekDays[todayIndex];
};
