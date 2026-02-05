import { CHART, POINT, WEEK_DAYS } from '@/utils/timerConstants';
import { getTodayName } from '@/utils/timerUtils';
import styles from './PointBarChart.module.css';

export default function PointBarChart({ data = [] }) {
  const todayName = getTodayName(WEEK_DAYS);

  const values = data.map((d) => d.dailyTotalPoints);
  const maxInData = Math.max(...values, POINT.MIN_MAX_VALUE); // 가장 큰 값 찾기
  const maxLimit =
    Math.ceil(maxInData / POINT.CEILING_UNIT) * POINT.CEILING_UNIT; // 최상단 눈금 값 -> 가장 큰 값보다 커야 함(올림)

  const getRatio = (val) => (maxLimit > 0 ? val / maxLimit : 0); // 전체 대비 데이터의 비율
  // y축 데이터 높이 계산하기
  const getY = (val) => {
    const ratio = getRatio(val);
    return CHART.HEIGHT * (1 - ratio) + CHART.TOP_PAD;
  };

  // x축 막대 세우는 좌표 구하기
  const getX = (index) => {
    const sectionWidth = (CHART.WIDTH - CHART.LEFT_PAD) / (data.length || 1); // x축 데이터 수많큼 나누기
    return CHART.LEFT_PAD + index * sectionWidth + sectionWidth / 2; // 나눈 칸의 중간에 막대 세울 수 있도록
  };

  // 눈금 나누기
  const levels = Array.from(
    { length: CHART.LEVEL_COUNT },
    (_, i) => (maxLimit / (CHART.LEVEL_COUNT - 1)) * i,
  );

  return (
    <div  className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>이번 주 기록</span>
      </div>

      <svg
        className={styles.pointChartSvg}
        viewBox={`0 0 ${CHART.WIDTH} ${CHART.HEIGHT + CHART.BOTTOM_PAD + CHART.TOP_PAD}`} // 왼쪽 위 기준 좌표화
      >
        {/* 배경 눈금선 */}
        {levels.map((level) => (
          <g key={`level-${level}`}>
            <line
              className={styles.chartGridLine}
              x1={CHART.LEFT_PAD} // x축 시작부터
              y1={getY(level)}
              x2={CHART.WIDTH} // x축 끝까지 쭉 그어주기
              y2={getY(level)}
            />
            <text
              className={styles.chartAxisLabel}
              x={CHART.LEFT_PAD - CHART.LABEL_X_OFFSET}
              y={getY(level)}
              dy=".3em" // 가운데 정렬 보정
              textAnchor="end" // 눈금값 오른쪽 정렬
            >
              {level}
            </text>
          </g>
        ))}

        {/* 데이터 막대 및 요일 */}
        {data.map((item, index) => {
          const x = getX(index);
          const y = getY(item.dailyTotalPoints); // 막대 시작 높이 구하기
          const barHeight = CHART.HEIGHT - y + CHART.TOP_PAD; // 막대 길이

          const isToday = item.day === todayName; // 오늘 확인
          const isZero = item.dailyTotalPoints === 0;

          return (
            <g key={`bar-${item.day}`}>
              {/* 막대 */}
              <rect
                className={`
                ${styles.chartBar} 
                ${isZero ? styles.chartBarZero : ''} 
                ${isToday ? styles.chartBarToday : ''}
              `}
                x={x - CHART.BAR_WIDTH / 2} // 막대 가운데로
                y={y}
                width={CHART.BAR_WIDTH}
                height={barHeight}
                rx="4"
              />
              {/* 점수 라벨 */}
              {item.dailyTotalPoints > 0 && (
                <text
                  className={
                    isToday ? styles.barPointLabelToday : styles.barPointLabel
                  }
                  x={x}
                  y={y - CHART.POINT_LABEL_GAP}
                  textAnchor="middle"
                >
                  {item.dailyTotalPoints}
                </text>
              )}
              {/* 요일 텍스트 */}
              <text
                className={isToday ? styles.dayLabelToday : styles.dayLabel}
                x={x}
                y={CHART.HEIGHT + CHART.TOP_PAD + CHART.X_AXIS_LABEL_GAP}
                textAnchor="middle"
              >
                {item.day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
