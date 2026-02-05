import { WEEK_DAYS, FOCUS, CHART } from '@/utils/timerConstants';
import { getTodayName } from '@/utils/timerUtils';
import styles from './FocusComboChart.module.css';

export default function FocusComboChart({ data = [] }) {
  const todayName = getTodayName(WEEK_DAYS);

  const totalValues = data.map((d) => d.dailyTotalActiveTime);
  const maxInData = Math.max(...totalValues, FOCUS.MIN_MAX_VALUE);
  const maxLimit =
    Math.ceil(maxInData / FOCUS.CEILING_UNIT) * FOCUS.CEILING_UNIT;

  const getRatio = (val) => (maxLimit > 0 ? val / maxLimit : 0);

  const getY = (val) => {
    const ratio = getRatio(val);
    return CHART.HEIGHT * (1 - ratio) + CHART.TOP_PAD;
  };

  const getX = (index) => {
    const sectionWidth = (CHART.WIDTH - CHART.LEFT_PAD) / (data.length || 1);
    return CHART.LEFT_PAD + index * sectionWidth + sectionWidth / 2;
  };

  const levels = Array.from(
    { length: CHART.LEVEL_COUNT },
    (_, i) => (maxLimit / (CHART.LEVEL_COUNT - 1)) * i,
  );

  // 선 그래프 점 위치(x, y)
  const linePoints = data
    .map((item, i) => `${getX(i)},${getY(item.dailyMaxActiveTime)}`)
    .join(' ');

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>이번 주 기록</span>
      </div>

      <svg
        className={styles.focusChartSVG}
        viewBox={`0 0 ${CHART.WIDTH} ${CHART.HEIGHT + CHART.BOTTOM_PAD + CHART.TOP_PAD}`}
      >
        {levels.map((level) => (
          <g key={`level-${level}`}>
            <line
              className={styles.chartGridLine}
              x1={CHART.LEFT_PAD}
              y1={getY(level)}
              x2={CHART.WIDTH}
              y2={getY(level)}
            />
            <text
              className={styles.chartAxisLabel}
              x={CHART.LEFT_PAD - CHART.LABEL_X_OFFSET}
              y={getY(level)}
              dy=".3em"
              textAnchor="end"
            >
              {Math.round(level)}
            </text>
          </g>
        ))}

        {/* 막대 그래프: 총 집중 시간 */}
        {data.map((item, index) => {
          const x = getX(index);
          const y = getY(item.dailyTotalActiveTime);
          const barHeight = CHART.HEIGHT - y + CHART.TOP_PAD;

          const isToday = item.day === todayName;
          const isZero = item.dailyTotalActiveTime === 0;

          return (
            <g key={`bar-${item.day}`}>
              <rect
                className={`
                ${styles.chartBar} 
                ${isZero ? styles.chartBarZero : ''} 
                ${isToday ? styles.chartBarToday : ''}
              `}
                x={x - CHART.BAR_WIDTH / 2}
                y={y}
                width={CHART.BAR_WIDTH}
                height={barHeight}
                rx="4"
              />
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

        {/* 선 그래프: 최장 집중 시간 */}
        <polyline className={styles.focusLine} points={linePoints} />

        {/* 선 그래프 꼭짓점 */}
        {data.map((item, index) => {
          const isToday = item.day === todayName;

          return (
            <circle
              className={isToday ? styles.focusDotToday : styles.focusDot}
              key={`dot-${index}`}
              cx={getX(index)}
              cy={getY(item.dailyMaxActiveTime)}
              r={
                isToday
                  ? FOCUS.DOT_RADIUS + FOCUS.DOT_HIGHLIGHT_SIZE
                  : FOCUS.DOT_RADIUS
              }
            />
          );
        })}

        {/* 선 그래프 위에 실제 수치(분) 표시 */}
        {data.map((item, index) => {
          // 데이터가 0이면 스킵
          if (item.dailyMaxActiveTime === 0) return null;

          return (
            <text
              className={styles.timeLabel}
              key={`label-${index}`}
              x={getX(index)}
              y={getY(item.dailyMaxActiveTime) - FOCUS.DOT_LABEL_GAP}
              textAnchor="middle"
            >
              {Math.round(item.dailyMaxActiveTime)}
            </text>
          );
        })}
      </svg>

      <div className={styles.legendContainer}>
        <div className={styles.legendContent}>
          <span className={styles.legendBar}></span>
          <span className={styles.legendLabel}>총 집중 시간</span>
        </div>
        <div className={styles.legendContent}>
          <span className={styles.legendLine}></span>
          <span className={styles.legendLabel}>최장 집중 시간</span>
        </div>
        <div className={styles.legendContent}>
          <span className={styles.legendLabel}>(단위: 분)</span>
        </div>
      </div>
    </div>
  );
}
