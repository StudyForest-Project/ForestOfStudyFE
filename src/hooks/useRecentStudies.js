import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentStudies'; //? 명칭 수정 예정
const MAX_RECENT = 10; // 최대 10개 유지

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function useRecentStudies() {
  const [recentStudies, setRecentStudies] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    return safeParse(saved, []);
  });

  // recentStudies가 바뀔 때마다 localStorage에 저장하는 행위(중복 방지)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentStudies));
  }, [recentStudies]);

  // 상세 진입 시 호출할 함수 관련
  const addRecentStudy = (studyId) => {
    setRecentStudies((prev) => {
      const withoutDup = prev.filter((item) => item.studyId !== studyId); // 필터 스팰링 오타 수정함
      const newItem = {
        studyId,
        // viewedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...withoutDup];
      return updated.slice(0, MAX_RECENT);
    });
  };

  //!(테스트용 입니다. 내용 최종 검토후 변경가능)
  //set function add

  const setRecentStudiesData = (overwriteRecentStudies) => {
    try {
      const validData = Array.isArray(overwriteRecentStudies)
        ? overwriteRecentStudies
        : [];
      setRecentStudies(validData);
      console.log('로컬스토리지 저장 완료', overwriteRecentStudies);
      console.log('로컬스토리지에 저장된 개수', overwriteRecentStudies.length);
      return true;
    } catch (error) {
      console.error('로컬스토리지 저장 실패', error);
      return false;
    }
  };

  //get function add
  // localStorage data => return   //ok => 어느정도 이해 완료 (저장되어 있는것을 꺼내서 다시 구현)
  const getRecentStudies = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parse = safeParse(stored, []);
        console.log('로컬스토리지에서 데이터 로드', parse);
        return parse;
      }
      console.log('로컬스토리지에 데이터 없음');
      return [];
    } catch (error) {
      console.error('로컬스토리지 읽기 실패', error);
      return [];
    }
  };

  return {
    recentStudies,
    addRecentStudy,
    setRecentStudiesData,
    getRecentStudies,
  };
}
