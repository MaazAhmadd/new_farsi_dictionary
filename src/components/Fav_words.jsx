import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
import { Container, Table, Row, Col } from 'reactstrap';
import Defaultwordicon from '../utils/defaultwordicon';
import getcolorfromword from '../utils/getcolorfromword';
import { useIndexedDB } from 'react-indexed-db';
import axios from 'axios';
import Item from './Item';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

export default function Fav_words() {
  let apiUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let [fav_words, setFav_words] = useState([]);
  let [fav_words_fa, setFav_words_fa] = useState([]);
  const { add: add1, getAll: getAll1 } = useIndexedDB('en2fa');
  const { add: add2, getAll: getAll2 } = useIndexedDB('fa2en');

  const getWords = async (wordlist) => {
    getAll1().then((en) => {
      getAll2().then((fa) => {
        let wordsincat = [];
        let words_en = en[0]['en2fa'];
        let words_fa = fa[0]['fa2en'];
        for (let i = 0; i < wordlist.length; i++) {
          const el = wordlist[i];
          let word = words_en.find((e) => {
            return e.English == el;
          });
          if (word) {
            wordsincat.push(word);
          } else {
            let word = words_fa.find((e) => {
              return e.Lang == el;
            });
            console.log('oooout', word, el);
            if (word) {
              console.log('ooooin', word, el);
              wordsincat.push(word);
            }
          }
        }
        console.log('wordsincat', wordsincat);
        setFav_words(wordsincat);
      });
    });
  };
  let sampleEn2Fa = {
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
  let sampleFa2En = {
    Lang: 'از',
    LangMeaning: 'LangMeaningSample',
    POS: 'POS Farsi Sample',
    LangPronunciation: 'LangPronounciationSample',
    English: 'the',
    LangSentence: 'مداد در کشو قرار دارد.',
    LangSentenceTranslate: 'The pencil is in the drawer.',
    LangAudio: 'a.mp3',
    EnglishAudio: 'a.mp3',
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios(apiUrl + '/users/me').then((resp) => {
        getWords(resp.data.fav_words);
      });
    }
  }, []);
  // console.log(fav_words);
  return (
    <div>
      <h1 style={{ marginLeft: '42%' }}>Favourite Words</h1>
      {fav_words.length < 1 ? (
        <h1 style={{ margin: '10% 0% 10% 38%' }}>favourites are empty</h1>
      ) : (
        <Container>
          <Row className="mb-5 justify-content-center_item">
            {fav_words &&
              fav_words?.map((w, k) => {
                // console.log('wwww', w);

                let { English, Lang, Transliteration, EnglishAudio } = w;
                return (
                  <Item
                    key={k}
                    wordAudio={`/farsi_audio/${EnglishAudio}`}
                    English={English}
                    Farsi={Lang}
                    wordIcon={`/word_images/${English}.jpg`}
                    fav={w.LangSentence}
                  />
                  // <Col sm={3} xs={6} key={k} className="mb-4">
                  //   <div
                  //     onClick={() => {
                  //       const audio = new Audio(`/farsi_audio/${EnglishAudio}`);
                  //       audio.play();
                  //     }}
                  //     style={{ backgroundColor: getcolorfromword(English) }}
                  //     className="word-item_card"
                  //   >
                  //     <div className="word-img">
                  //       <Defaultwordicon />
                  //     </div>
                  //     {/* backgroundColor: getcolorfromword(English + 'ex'), */}
                  //     {!w.LangSentence ? (
                  //       <div style={{ width: '100%' }}>
                  //         <div className="card-item-line"></div>
                  //         <div className="word-english">{English}</div>
                  //         <div className="word-farsi">{Lang}</div>
                  //       </div>
                  //     ) : (
                  //       <div style={{ width: '100%' }}>
                  //         <div className="card-item-line"></div>
                  //         <div className="word-english">{Lang}</div>
                  //         <div className="word-farsi">{English}</div>
                  //       </div>
                  //     )}
                  //   </div>
                  // </Col>
                );
              })}
          </Row>
        </Container>
      )}
    </div>
  );
}
