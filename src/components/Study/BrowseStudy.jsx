import { useEffect, useRef, useState } from 'react';
import styles from './BrowseStudy.module.css';
import { StudyCard } from './StudyCard.jsx';
import searchIcon from '../../assets/icons/ic_search.svg';
import toggleIcon from '../../assets/icons/ic_toggle.svg';
import useStudyListStore from '@/stores/useStudyListStore';
// import { showWarningToast } from '@/utils/toast';

const PAGE_SIZE = 6;
const MORE_PAGE_SIZE = 12;
const SORT_OPTIONS = [
  { label: '최근 순', value: 'recent' },
  { label: '오래된 순', value: 'oldest' },
  { label: '많은 포인트 순', value: 'mostPoints' },
  { label: '적은 포인트 순', value: 'leastPoints' },
];

export const BrowseStudy = () => {
  const inputRef = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const studyData = useStudyListStore((s) => s.studyData);
  const fetchStudies = useStudyListStore((s) => s.fetchStudies);
  const nextCursor = useStudyListStore((s) => s.nextCursor);

  const [sortState, setSortState] = useState('recent');

  useEffect(() => {
    fetchStudies(PAGE_SIZE, '', 'recent', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(studyData, '>>>>>>');
  console.log(nextCursor);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortState).label;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudies(6, searchInput.trim(), sortState, null);
  };

  return (
    <>
      <h2 className={styles.title}>스터디 둘러보기</h2>
      <div className={styles.searchToggle}>
        <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
          <img src={searchIcon} alt="돋보기" className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder="검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setSearchInput('');
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </form>
        <div
          className={styles.toggleContainer}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={styles.toggleText}>{currentSortLabel}</span>
          <img src={toggleIcon} alt="토글" className={styles.toggleIcon} />
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {SORT_OPTIONS.map((option) => (
              <div
                key={option.value}
                className={styles.dropdownItem}
                onClick={() => {
                  setSortState(option.value);
                  setIsDropdownOpen(false);
                  fetchStudies(6, searchInput, option.value, null);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {Array.isArray(studyData) && studyData.length > 0 ? (
          studyData.map((item) => <StudyCard key={item.id} item={item} />)
        ) : (
          <div className={styles.empty}>아직 둘러 볼 스터디가 없어요</div>
        )}
      </div>
      {nextCursor !== null && (
        <button
          className={styles.moreBtn}
          onClick={() =>
            fetchStudies(MORE_PAGE_SIZE, searchInput, sortState, nextCursor)
          }
        >
          더보기
        </button>
      )}
    </>
  );
};
