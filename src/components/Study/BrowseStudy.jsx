import { useEffect, useState } from 'react';
import styles from './BrowseStudy.module.css';
import axios from 'axios';
import { StudyCard } from './StudyCard.jsx';
import searchIcon from '../../assets/icons/ic_search.svg';
import toggleIcon from '../../assets/icons/ic_toggle.svg';

export const BrowseStudy = () => {
  const [count, setCount] = useState(6);
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortState, setSortState] = useState('최근 순');
  const [studyData, setStudyData] = useState([]);

  useEffect(() => {
    const getStudies = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/studies?pageSize=100',
        );
        setStudyData(response.data?.items || []);
      } catch (error) {
        console.error(error);
      }
    };
    getStudies();
  }, []);

  const totalCount = Array.isArray(studyData) ? studyData.length : 0;
  const more = count < totalCount;
  const sortOption = [
    '최근 순',
    '오래된 순',
    '많은 포인트 순',
    '적은 포인트 순',
  ];
  const items = Array.isArray(studyData)
    ? studyData
        .filter((item) =>
          [item.title, item.nickname, item.description].some(
            (
              field, //모든 필드 검색
            ) =>
              field
                .replace(/\s+/g, '') //띄어쓰기 무시
                .toLowerCase()
                .includes(searchKeyword.replace(/\s+/g, '').toLowerCase()), //소문자로 변경해서 구분 (Upper로 입력해도 호환되게)
          ),
        )
        .sort((a, b) => {
          switch (sortState) {
            case '최근 순':
              return new Date(b.createdAt) - new Date(a.createdAt);
            case '오래된 순':
              return new Date(a.createdAt) - new Date(b.createdAt);
            case '많은 포인트 순':
              return b.totalPoint - a.totalPoint;
            case '적은 포인트 순':
              return a.totalPoint - b.totalPoint;
            default:
              return 0;
          }
        })
        .slice(0, count)
    : [];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>스터디 둘러보기</h2>
      <div className={styles.searchToggle}>
        <div className={styles.searchContainer}>
          <img src={searchIcon} alt="돋보기" className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="search"
            placeholder="검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchKeyword(searchInput);
                e.currentTarget.blur();
              }
            }}
          />
        </div>
        <div
          className={styles.toggleContainer}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className={styles.toggleText}>{sortState}</span>
          <img src={toggleIcon} alt="토글" className={styles.toggleIcon} />
        </div>
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            {sortOption.map((option) => (
              <div
                key={option}
                className={styles.dropdownItem}
                onClick={() => {
                  setSortState(option);
                  setDropdownOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {Array.isArray(items) ? (items.map((item) => <StudyCard key={item.id} item={item} />)) 
        : (<div className={styles.empty}>아직 둘러 볼 스터디가 없어요</div>
        )}
      </div>
      {more && (
        <button
          className={styles.moreBtn}
          onClick={() => setCount((c) => c + 3)}
        >
          더보기
        </button>
      )}
    </section>
  );
};
