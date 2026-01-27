import { Link } from 'react-router-dom';
import { StudyCard } from '../components/Study/StudyCard';

export const HomePage = () => {
  return (
    <>
      <h1>홈 페이지</h1>
      <StudyCard />
      <Link to="/study/1">상세페이지</Link>
    </>
  );
};
