import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faVolumeUp } from "@fortawesome/free-solid-svg-icons/faVolumeUp";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Table, Row, Col } from 'reactstrap';
import Defaultwordicon from '../utils/defaultwordicon';
import getcolorfromword from '../utils/getcolorfromword';

const CategoryCardItem = () => {
  const { categoryName } = useParams();
  let data = JSON.parse(sessionStorage.getItem('wordCategories'));
  data = data?.find((dt) => dt.card_name.toLowerCase() === categoryName.toLowerCase());
  const [words, setWords] = useState();

  const getWords = async (wordlist) => {
    let wordsincat = [];
    for (let i = 0; i < wordlist.length; i++) {
      const el = wordlist[i];
      await axios
        .get(`/data/words/${el}.json`)
        .then((data) => {
          wordsincat.push(data.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    setWords(wordsincat);
  };
  useEffect(() => {
    getWords(data.words);
  }, []);

  return (
    <>
      <Container>
        <div className="common-page">
          <h1 className="common-page-title">
            Words By {categoryName}
            <Link className="backToHome float-end" to="/">
              Back to Home
            </Link>
          </h1>
          <Row className="mb-5 justify-content-center_item">
            {words &&
              words?.map((w, k) => {
                let { English, Farsi, Transliteration, Farsi_Audio } = w;
                return (
                  <Col sm={3} xs={6} key={k} className="mb-4">
                    <div
                      onClick={() => {
                        const audio = new Audio(`/farsi_audio/${Farsi_Audio}`);
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
                        <div className="word-farsi">{Farsi}</div>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default CategoryCardItem;
