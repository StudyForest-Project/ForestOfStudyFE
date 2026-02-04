import { DONUT } from '@/utils/timerConstants';
import styles from './FocusDonutChart.module.css';

export default function FocusDonutChart({ total = 0, value = 0 }) {
  const center = DONUT.SIZE / 2; // 원 중심 좌표
  const circumference = 2 * Math.PI * DONUT.RADIUS; // 원 둘레

  const ratio = total > 0 ? value / total : 0; // 전체 대비 데이터의 비율
  const percentage = Math.round(ratio * 100); // 비율 정수화

  const strokeDashoffset = circumference * (1 - ratio); // 공백 길이

  return (
    <div className={styles.donutContainer}>
      <svg
        className={styles.donutSvg}
        width={DONUT.SIZE}
        height={DONUT.SIZE}
        viewBox={`0 0 ${DONUT.SIZE} ${DONUT.SIZE}`} // 왼쪽 위 기준 좌표화
      >
        {/* 배경 원 */}
        <circle
          className={styles.backgroundCircle}
          cx={center}
          cy={center}
          r={DONUT.RADIUS}
          stroke={DONUT.COLOR_BG}
          strokeWidth={DONUT.STROKE_WIDTH}
        />

        {/* 데이터 표시 */}
        <circle
          className={styles.mainCircle}
          cx={center}
          cy={center}
          r={DONUT.RADIUS}
          stroke={DONUT.COLOR_MAIN}
          strokeWidth={DONUT.STROKE_WIDTH}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          // SVG 원은 기본 3시 방향 시작 -> 12시 방향으로 회전시켜줘야 함
          transform={`rotate(-90 ${center} ${center})`}
        />

        {/* 중앙 텍스트 (비율) */}
        <text
          className={styles.percentageText}
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em" // 가운데 정렬 보정
        >
          {percentage}%
        </text>

        {/* 보조 텍스트 (횟수) */}
        <text className={styles.subText} x="50%" y="70%" textAnchor="middle">
          ({value} / {total})
        </text>
      </svg>
    </div>
  );
}
