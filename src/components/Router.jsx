import './styles.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import Privacy from './Privacy';
import Terms from './Terms';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Footer from './Footer';
import CategoryCardItem from './CategoryCardItem';
import CategoryPage from './CategoryPage';
import PhraseItem from './PhraseItem';
import PhrasePage from './PhrasePage';
import NotFoundPage from './NotFoundPage';
import Fav_words from './Fav_words';
import Search from './Search';
import GrammarCardItem from './GrammarCardItem';
import GrammarPage from './GrammarPage';

let user;
try {
  user = localStorage.getItem('token');
} catch (error) {}

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/about-us">
          <AboutUs />
        </Route>
        <Route exact path="/privacy">
          <Privacy />
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/signup">
          {user ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route exact path="/fav_words">
          {!user ? <Redirect to="/login" /> : <Fav_words />}
        </Route>
        <Route exact path="/terms">
          <Terms />
        </Route>
        <Route exact path="/words/:wordName">
          <Search />
        </Route>
        <Route exact path="/words">
          <Search />
        </Route>
        <Route exact path="/wordCategory/:categoryName">
          <CategoryCardItem />
        </Route>
        <Route exact path="/wordCategory">
          <CategoryPage />
        </Route>
        <Route exact path="/phraseCategory/:phraseName">
          <PhraseItem />
        </Route>
        <Route exact path="/phraseCategory">
          <PhrasePage />
        </Route>
        <Route exact path="/grammarCategory/:grammarName">
          <GrammarCardItem />
        </Route>
        <Route exact path="/grammarCategory">
          <GrammarPage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
