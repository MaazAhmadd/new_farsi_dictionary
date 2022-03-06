import React from 'react';

import Search from './Search';
import SearchComp from './SearchComp';
import CategoryCard from './CategoryCard';
import PhraseCard from './PhraseCard';
import DailyWord from './DailyWord';
import GrammarCard from './GrammarCard';

const Home = () => {
  return (
    <div>
      <SearchComp />
      <CategoryCard />
      {/* <hr /> */}
      <PhraseCard />
      {/* <hr /> */}
      <GrammarCard />
      {/* <hr /> */}
      <DailyWord />
    </div>
  );
};

export default Home;
