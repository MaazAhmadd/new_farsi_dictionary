import React, { useEffect, useState, useEffectAsync } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
// import Localbase from 'localbase';
import { useIndexedDB } from 'react-indexed-db';

// let db = new Localbase('db');

const DailyWord = () => {
  const [words, setWords] = useState([]);
  const { add, getAll } = useIndexedDB('en2fa');

  const getCategories = () => {
    getAll().then((d) => {
      setWords(d[0]['en2fa']);
    });

    // setWords(wa[0]['en2fa']);

    // const dataUrl = '/data/dailyWord.json';
    // fetch(dataUrl, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setWords(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };
  useEffect(() => {
    getCategories();
    // getAll().then((d) => {
    //   console.log('ok', d[0]['en2fa']);
    //   setWords(d[0]['en2fa']);
    // });
  }, []);
  if (words.length) {
    let wt = 275;
    let { English, EnglishPronounciation, Lang, EnglishAudio } = words[wt];
    return (
      <Container style={!words ? { minHeight: 250 } : {}}>
        <div className="dailyword">
          <h1>Word Of The Day</h1>
          <div style={{ display: 'flex', color: '#1b85e5' }}>
            <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: '600' }}>{English}</span>
            {
              <span className="audio-icon-2">
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  onClick={() => {
                    const audio = new Audio(`/farsi_audio/${EnglishAudio}`);
                    audio.play().then(() => {});
                  }}
                />
              </span>
            }
          </div>
          <div>{Lang}</div>
        </div>
      </Container>
    );
  }
  return <div>Loading...</div>;
};

export default DailyWord;