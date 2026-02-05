export const TIME = {
  MINUTES_IN_HOUR: 60,
  SECONDS_IN_MINUTE: 60,
  SECONDS_IN_HOUR: 3600,
};

export const LIMITS = {
  MAX_HOURS: 12,
  MAX_MINUTES: 59,
  RECENT_TIMES_LIMIT: 3,
  INPUT_LIMIT: 2,
};

export const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const CHART = {
  WIDTH: 500,
  HEIGHT: 250,
  TOP_PAD: 40, // 윗쪽 여백
  LEFT_PAD: 50, // y축 표시용 공간
  BOTTOM_PAD: 40, // x축 표시용 공간
  LEVEL_COUNT: 5, // 눈금 개수
  LABEL_X_OFFSET: 12, // Y축 글자 선으로부터 띄울 간격
  POINT_LABEL_GAP: 10, //점수 라벨
  X_AXIS_LABEL_GAP: 25, // 요일 텍스트 간격
  BAR_WIDTH: 30, // 막대 너비
};

export const POINT = {
  MIN_MAX_VALUE: 10, // 최소 최대값 -> 모든 데이터 0이여도 차트 생성될 수 있도록
  CEILING_UNIT: 10, // 10단위 올림
};

export const FOCUS = {
  MIN_MAX_VALUE: 60,
  CEILING_UNIT: 60, // 60단위 올림 

  DOT_RADIUS: 4, // 선 그래프 점 크기
  DOT_HIGHLIGHT_SIZE: 1.5, // 오늘 하이라이트용
  DOT_LABEL_GAP: 12,
};

export const DONUT = {
  SIZE: 300, // SVG 전체 크기
  STROKE_WIDTH: 30, // 도넛 두께
  RADIUS: 120, // 원의 반지름
};
