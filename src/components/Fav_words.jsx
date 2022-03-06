import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
import { Container, Table, Row, Col } from 'reactstrap';
import Defaultwordicon from '../utils/defaultwordicon';
import getcolorfromword from '../utils/getcolorfromword';
import { useIndexedDB } from 'react-indexed-db';
import axios from 'axios';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

export default function Fav_words() {
  let apiUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let [fav_words, setFav_words] = useState([]);
  const { add: add1, getAll: getAll1 } = useIndexedDB('en2fa');

  const getWords = async (wordlist) => {
    getAll1().then((d) => {
      let wordsincat = [];
      let words = d[0]['en2fa'];
      for (let i = 0; i < wordlist.length; i++) {
        const el = wordlist[i];
        let word = words.find((e) => {
          return e.English == el;
        });
        // console.log(word);
        wordsincat.push(word);
      }
      setFav_words(wordsincat);
    });
  };
  let sample = {
    English: 'be',
    EnglishMeaning: 'exist',
    POS: 'verb',
    EnglishPronounciation: 'budan',
    Lang: 'بودن',
    EnglishSentence: 'The ocean is blue.',
    EnglishSentenceTranslate: 'اقیانوس آبی است',
    EnglishAudio: 'be.wav',
    LangAudio: 'budan.wav',
  };
  useEffect(() => {
    axios(apiUrl + '/users/me').then((resp) => {
      getWords(resp.data.fav_words);
    });
  }, []);
  // console.log(fav_words);
  return (
    <div>
      {fav_words.length < 1 ? (
        <h1 style={{ margin: '10% 0% 10% 38%' }}>favourites are empty</h1>
      ) : (
        <Container>
          <Row className="mb-5 justify-content-center_item">
            {fav_words &&
              fav_words?.map((w, k) => {
                let { English, Lang, Transliteration, EnglishAudio } = w;
                return (
                  <Col sm={3} xs={6} key={k} className="mb-4">
                    <div
                      onClick={() => {
                        const audio = new Audio(`/farsi_audio/${EnglishAudio}`);
                        audio.play();
                      }}
                      style={{ backgroundColor: getcolorfromword(English) }}
                      className="word-item_card"
                    >
                      <div className="word-img">
                        <Defaultwordicon />
                      </div>
                      {/* backgroundColor: getcolorfromword(English + 'ex'), */}
                      <div style={{ width: '100%' }}>
                        <div className="card-item-line"></div>
                        <div className="word-english">{English}</div>
                        <div className="word-farsi">{Lang}</div>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      )}
    </div>
  );
}
