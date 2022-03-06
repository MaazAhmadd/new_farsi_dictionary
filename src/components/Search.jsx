import React, { useEffect, useRef, useState } from 'react';
import { FormGroup, Input, Container } from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import WordRender from './WordRender';
import { Redirect, useLocation, useParams, useHistory } from 'react-router-dom';
import Localbase from 'localbase';
import { useIndexedDB } from 'react-indexed-db';

let db = new Localbase('db');

const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  // @ts-ignore
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // @ts-ignore
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

const Search = () => {
  let locationPath = useLocation().pathname;
  let params = useParams();
  let history = useHistory();
  const { add: add1, getAll: getAll1 } = useIndexedDB('en2fa');
  const { add: add2, getAll: getAll2 } = useIndexedDB('fa2en');
  const { add: add3, getAll: getAll3 } = useIndexedDB('en2faAllWords');
  const { add: add4, getAll: getAll4 } = useIndexedDB('fa2enAllWords');

  const boxDiv = useRef(null);
  const searchInput = useRef(null);
  const [search, setSearch] = useState();
  const [en2faWords, setEn2faWords] = useState([]);
  const [en2faOnlyWords, setEn2faOnlyWords] = useState([]);
  const [fa2enWords, setFa2enWords] = useState([]);
  const [fa2enOnlyWords, setFa2enOnlyWords] = useState([]);
  const [en2faResultSelected, setEn2faResultSelected] = useState([]);
  const [fa2enResultSelected, setFa2enResultSelected] = useState([]);
  const [searchResult, setSearchResults] = useState();
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const [cursor, setCursor] = useState(0);
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const enterPress = useKeyPress('Enter');

  const handleHideDropdown = (event) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };
  const handleClickOutside = (event) => {
    if (boxDiv.current && event.target && !boxDiv.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };
  const changeSearchHandler = () => {
    const searchText = searchInput?.current?.value;
    setCursor(0);
    setIsComponentVisible(true);
    setSearch(searchText);
    let results = [];
    if (searchText) {
      results = en2faOnlyWords
        ?.filter((word) => word?.toLowerCase()?.search(searchText.toLowerCase()?.trim()) === 0)
        ?.slice(0, 10);
      if (!results || results?.length === 0) {
        results = fa2enOnlyWords
          ?.filter((word) => word?.toLowerCase()?.search(searchText.toLowerCase()?.trim()) === 0)
          ?.slice(0, 10);
      }
    }
    setSearchResults(results);
  };

  const getWords = async () => {
    getAll1().then((d) => {
      setEn2faWords(d[0]['en2fa']);
    });
    getAll2().then((d) => {
      setFa2enWords(d[0]['fa2en']);
    });
    getAll3().then((d) => {
      setEn2faOnlyWords(d[0]['en2faAllWords']);
    });
    getAll4().then((d) => {
      setFa2enOnlyWords(d[0]['fa2enAllWords']);
    });
  };
  function buildSelectedResult(word) {
    if (en2faOnlyWords.includes(word)) {
      setFa2enResultSelected(undefined);
      setEn2faResultSelected(en2faWords?.filter((en2faWord) => en2faWord?.English?.trim() === word));
    } else if (fa2enOnlyWords?.includes(word)) {
      setEn2faResultSelected(undefined);
      setFa2enResultSelected(fa2enWords?.filter((fa2enWord) => fa2enWord?.Lang?.trim() === word));
    }
    // }
  }
  let startw = async () => {
    searchInput.current.value = params.wordName;
    buildSelectedResult(params.wordName);
  };

  useEffect(() => {
    getWords();
    startw();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (searchResult?.length && downPress) {
      setCursor((prevState) => (prevState < searchResult?.length - 1 ? prevState + 1 : prevState));
    }
  }, [downPress]);

  useEffect(() => {
    if (searchResult?.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (enterPress) {
      buildSelectedResult(searchResult?.[cursor]);
      setIsComponentVisible(false);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (!searchResult?.length) {
      setIsComponentVisible(false);
    }
  }, [searchResult]);

  return (
    <>
      <div className="hero-noimg">
        <Container className="">
          <div className="search-form_s">
            <FormGroup className="custom-search-box">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Type English or Farsi Word"
                onChange={changeSearchHandler}
                innerRef={searchInput}
                onFocus={() => setIsComponentVisible(true)}
              />
              <FontAwesomeIcon icon={faSearch} />
              {search && search?.length > 0 && isComponentVisible && (
                <ul className="search-result">
                  {searchResult && searchResult?.length > 0 ? (
                    searchResult?.map((word, key) => {
                      return (
                        <li
                          key={key}
                          onClick={() => {
                            buildSelectedResult(word);
                            setIsComponentVisible(false);
                          }}
                          className={classNames({
                            hover: key === cursor,
                          })}
                          onMouseEnter={() => {
                            setCursor(key);
                          }}
                        >
                          {word}
                        </li>
                      );
                    })
                  ) : (
                    <li className="no_match_found">No match found</li>
                  )}
                </ul>
              )}
            </FormGroup>
          </div>
        </Container>
      </div>

      <Container className="">
        <div className="result-con_s">
          {fa2enResultSelected || fa2enResultSelected ? (
            <>
              {en2faResultSelected && <WordRender words={en2faResultSelected} lang="en" />}
              {fa2enResultSelected && <WordRender words={fa2enResultSelected} lang="fa" />}
            </>
          ) : (
            <div className="selected-no-result">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Search;
