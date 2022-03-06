import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import http from '../services/httpService';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

http.setJwt(localStorage.getItem('token'));
let fav_words = JSON.parse(sessionStorage.getItem('fav_words'));

const WordRender = ({ words, lang }) => {
  const [groupByPOSMeaning, setGroupByPOSMeaning] = useState();
  const [wordTitle, setWordTitle] = useState();
  const [wordAudio, setWordAudio] = useState();
  const [favWordStatus, setFavWordStatus] = useState(false);
  useEffect(() => {
    if (lang === 'en') {
      setWordTitle(words?.[0]?.English);
      setWordAudio(words?.[0]?.EnglishAudio);
      if (fav_words.includes(words[0].English)) {
        setFavWordStatus(true);
      } else {
        setFavWordStatus(false);
      }
    } else if (lang === 'fa') {
      setWordTitle(words?.[0]?.Lang);
      setWordAudio(words?.[0]?.LangAudio);
      if (fav_words.includes(words[0].Lang)) {
        setFavWordStatus(true);
      } else {
        setFavWordStatus(false);
      }
    }
    setGroupByPOSMeaning(
      words.reduce(function (r, a) {
        r[a.POS] = r[a.POS] || [];
        if (lang === 'en') {
          r[a.POS][a?.EnglishMeaning] = r[a.POS][a?.EnglishMeaning] || [];
          r[a.POS][a?.EnglishMeaning].push(a);
        } else if (lang === 'fa') {
          r[a.POS][a?.LangMeaning] = r[a.POS][a?.LangMeaning] || [];
          r[a.POS][a?.LangMeaning].push(a);
        }
        return r;
      }, Object.create(null))
    );
  }, [words, lang]);
  let wordNumber = 0;
  let handleAddToFav = (word) => {
    http
      .post('/users/fav_words', {
        fav_word: word,
      })
      .then((resp) => {
        console.log(resp);
        toast('added to favourites', {
          type: 'success',
        });
        setFavWordStatus(true);
      })
      .catch((err) => {
        console.log(err);
        toast('word already added to favourites');
        setFavWordStatus(true);
      });
  };
  // useEffect(() => {
  //   if (fav_words.includes(wordTitle)) {
  //     setFavWordStatus(true);
  //   }
  //   console.log(wordTitle);
  //   console.log(fav_words.includes(wordTitle));
  // }, []);
  return (
    <div className="selected-result">
      <div className="word-title">
        {wordTitle}
        {wordAudio && (
          <span className="audio-icon">
            <FontAwesomeIcon
              icon={faVolumeUp}
              onClick={() => {
                const audio = new Audio(`english_audio/${wordAudio}`);
                audio.play().then(() => {});
              }}
            />
          </span>
        )}
        {favWordStatus ? (
          <BsSuitHeartFill
            onClick={() => {
              toast('word already added to favourites');
            }}
            style={{
              color: '#ffc107',
              fontSize: '30px',
              marginLeft: '60px',
              cursor: 'pointer',
            }}
          />
        ) : (
          <BsSuitHeart
            onClick={() => {
              handleAddToFav(wordTitle);
            }}
            style={{
              color: '#ffc107',
              fontSize: '30px',
              marginLeft: '60px',
              cursor: 'pointer',
            }}
          />
        )}
        {/* <span>
          </span> */}
      </div>
      {groupByPOSMeaning &&
        Object.keys(groupByPOSMeaning)?.map((pos, key) => (
          <div key={key} className="meaning-box">
            <div className="meaning-label">{pos}</div>
            {groupByPOSMeaning[pos] &&
              Object.keys(groupByPOSMeaning[pos])?.map((pos_meaning, key3) => (
                <div key={key3} className="pos-con">
                  <div className="pos-meaning">
                    {++wordNumber}. ({pos_meaning})
                  </div>
                  <ol type="a">
                    {groupByPOSMeaning?.[pos]?.[pos_meaning]?.map((word, key2) => {
                      let meaning = '';
                      let pronunciation = '';
                      let audioFile = '';
                      let sentence = '';
                      let sentenceTranslate = '';
                      if (lang === 'en') {
                        meaning = word.Lang;
                        audioFile = word.LangAudio;
                        pronunciation = word.EnglishPronunciation;
                        sentence = word.EnglishSentence;
                        sentenceTranslate = word.EnglishSentenceTranslate;
                      } else if (lang === 'fa') {
                        meaning = word.English;
                        audioFile = word.EnglishAudio;
                        pronunciation = word.LangPronunciation;
                        sentence = word.LangSentence;
                        sentenceTranslate = word.LangSentenceTranslate;
                      }
                      return (
                        <li key={key2}>
                          <div className="meaning-title">
                            {meaning} ({pronunciation})
                            {audioFile && (
                              <span className="audio-icon">
                                <FontAwesomeIcon
                                  icon={faVolumeUp}
                                  onClick={() => {
                                    const audio = new Audio(`farsi_audio/${audioFile}`);
                                    audio.play().then(() => {});
                                  }}
                                />
                              </span>
                            )}
                          </div>
                          <div className="meaning-pronunciation">
                            <span className="sentence">{sentence}</span> -{' '}
                            <span className="sentenceTranslate">{sentenceTranslate}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default WordRender;
