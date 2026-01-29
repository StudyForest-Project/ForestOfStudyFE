import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentStudies';
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
      const withoutDup = prev.fillter((item) => item.studyId !== studyId);
      const newItem = {
        studyId,
        viewedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...withoutDup];
      return updated.slice(0, MAX_RECENT);
    });
  };

  return {
    recentStudies,
    addRecentStudy,
  };
}
