import { NavLink, Outlet, useParams } from 'react-router';
import { getFocusInfo } from '@/services/focusService';
import { useFetchData } from '@/hooks/useFetchData';
import styles from './TodayFocus.module.css';
import { PointBadge } from '@/components/PointBadge';
import { NavButton } from '@/components';
import { updateTimeList } from '@/utils/timerUtils';

export const TodayFocusPage = () => {
  const { studyId } = useParams();

  const { data, setData, isLoading, error } = useFetchData(
    getFocusInfo,
    studyId,
  );

  const updatedPoint = (newTotalPoint) => {
    setData((prev) => ({
      ...prev,
      study: { ...prev.study, totalPoint: newTotalPoint },
    }));
  };

  const updatedTimeList = (minutes, label) => {
    setData((prev) => ({
      ...prev,
      timeList: updateTimeList(prev.timeList, minutes, label),
    }));
  };

  if (isLoading) {
    return <div>정보를 불러오는 중입니다...</div>;
  }
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      <div className={styles.top}>
        <h1 className={styles.studyTitle}>{data.study.title}</h1>

        <div className={styles.nav}>
          <NavButton to="../habit">오늘의 습관</NavButton>
          <NavButton to="..">스터디 상세</NavButton>
        </div>
      </div>

      <div>
        <PointBadge totalPoint={data.study.totalPoint} label />
      </div>

      <div>
        <nav className={styles.tabNav}>
          <NavLink
            to="timer"
            className={({ isActive }) =>
              isActive
                ? `${styles.tabItem} ${styles.activeTabItem}`
                : styles.tabItem
            }
          >
            타이머
          </NavLink>

          <NavLink
            to="focus-stats"
            className={({ isActive }) =>
              isActive
                ? `${styles.tabItem} ${styles.activeTabItem}`
                : styles.tabItem
            }
          >
            집중 기록
          </NavLink>

          <NavLink
            to="point-stats"
            className={({ isActive }) =>
              isActive
                ? `${styles.tabItem} ${styles.activeTabItem}`
                : styles.tabItem
            }
          >
            포인트 기록
          </NavLink>
        </nav>

        <div>
          <Outlet
            context={{
              studyId,
              timeList: data.timeList,
              onUpdateTimeList: updatedTimeList,
              onSaveSuccess: updatedPoint,
            }}
          />
        </div>
      </div>
    </div>
  );
};
