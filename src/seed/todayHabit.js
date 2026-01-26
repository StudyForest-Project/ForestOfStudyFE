// 오늘의 습관 조회 응답 (studyId 기준)
// studyDetail.js의 habitWeek.rows와 동기화됨
export const todayHabit = {
  // 연우의 개발공장
  '71HFE865V215DE1CTEWH0AVNH9': {
    today: '2026-01-23',
    now: '2026-01-23T03:40:00.000Z',
    habits: [
      { habitId: '01HBT001AAAAAAAAAAAAAAAA01', title: '아침 책읽기', checked: true },
      { habitId: '01HBT002AAAAAAAAAAAAAAAA02', title: '운동 30분', checked: true },
      { habitId: '01HBT001AAAAAAAAAAAAAAAA03', title: '코드 리뷰', checked: false },
      { habitId: '01HBT001AAAAAAAAAAAAAAAA04', title: '영어 단어 암기', checked: false },
      { habitId: '01HBT001AAAAAAAAAAAAAAAA05', title: '일기 쓰기', checked: true },
    ],
  },
  // 알고리즘 루틴
  '2X7R5JQC42EJ5E6RHXQAQPDH4A': {
    today: '2026-01-23',
    now: '2026-01-23T03:40:00.000Z',
    habits: [
      { habitId: '01HBT003AAAAAAAAAAAAAAAA03', title: '알고리즘 1문제', checked: false },
      { habitId: '01HBT004AAAAAAAAAAAAAAAA04', title: '코드 리뷰', checked: true },
      { habitId: '01HBT003AAAAAAAAAAAAAAAA06', title: 'LeetCode 풀기', checked: true },
      { habitId: '01HBT003AAAAAAAAAAAAAAAA07', title: '시간복잡도 분석', checked: false },
      { habitId: '01HBT003AAAAAAAAAAAAAAAA08', title: '풀이 블로그 작성', checked: false },
    ],
  },
  // 리액트 매일
  M3E2MSH4DMDZSX9G8FGVSQE8Z5: {
    today: '2026-01-23',
    now: '2026-01-23T03:40:00.000Z',
    habits: [
      { habitId: '01HBT005AAAAAAAAAAAAAAAA05', title: 'React 공식문서 읽기', checked: true },
      { habitId: '01HBT006AAAAAAAAAAAAAAAA06', title: '컴포넌트 1개 만들기', checked: false },
      { habitId: '01HBT005AAAAAAAAAAAAAAAA09', title: 'Hook 실습', checked: true },
      { habitId: '01HBT005AAAAAAAAAAAAAAAA10', title: '상태관리 학습', checked: false },
      { habitId: '01HBT005AAAAAAAAAAAAAAAA11', title: 'TypeScript 적용', checked: false },
    ],
  },
  // 백엔드 러닝
  XG07HN7JVAX0GB6KC9QA0MZ17Q: {
    today: '2026-01-23',
    now: '2026-01-23T03:40:00.000Z',
    habits: [
      { habitId: '01HBT007AAAAAAAAAAAAAAAA07', title: 'Node.js 학습', checked: false },
      { habitId: '01HBT007AAAAAAAAAAAAAAAA12', title: 'Express 라우팅', checked: true },
      { habitId: '01HBT007AAAAAAAAAAAAAAAA13', title: 'DB 쿼리 연습', checked: false },
      { habitId: '01HBT007AAAAAAAAAAAAAAAA14', title: 'API 설계', checked: false },
      { habitId: '01HBT007AAAAAAAAAAAAAAAA15', title: '에러 핸들링', checked: false },
    ],
  },
  // CS 기초
  '88YAGVDCKSQWW7FE4N1EE043E4': {
    today: '2026-01-23',
    now: '2026-01-23T03:40:00.000Z',
    habits: [
      { habitId: '01HBT008AAAAAAAAAAAAAAAA08', title: 'CS 개념 정리', checked: false },
      { habitId: '01HBT009AAAAAAAAAAAAAAAA09', title: '면접 질문 복습', checked: true },
      { habitId: '01HBT008AAAAAAAAAAAAAAAA16', title: '운영체제 학습', checked: false },
      { habitId: '01HBT008AAAAAAAAAAAAAAAA17', title: '네트워크 정리', checked: true },
      { habitId: '01HBT008AAAAAAAAAAAAAAAA18', title: '자료구조 복습', checked: false },
    ],
  },
};

// 스터디 ID로 오늘의 습관 조회
export const getTodayHabit = (studyId) => {
  return (
    todayHabit[studyId] || {
      today: '2026-01-23',
      now: '2026-01-23T03:40:00.000Z',
      habits: [],
    }
  );
};
