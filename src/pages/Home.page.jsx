import { Link } from 'react-router-dom';
import { RecentPage } from '../components/Study/sections/Recent.page';
import { BrowseStudiesPage } from '../components/Study/sections/BrowseStudies.page';

export const HomePage = () => {
  return (
    <>
      <RecentPage />
      <BrowseStudiesPage />
    </>
  );
};
