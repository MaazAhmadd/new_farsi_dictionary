import React, { useEffect, useState } from 'react';
import { Container, Table, Row, Col } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import Defaultwordicon from '../utils/defaultwordicon';
import getcolorfromword from '../utils/getcolorfromword';
import axios from 'axios';

const CategoryCardItem = () => {
  const { phraseName } = useParams();
  let data = JSON.parse(sessionStorage.getItem('phrasesCategories'));
  data = data?.find(
    (dt) => dt.card_name.toLowerCase().replaceAll(' ', '-') === phraseName.toLowerCase().replaceAll(' ', '-')
  );
  const [phrases, setPhrases] = useState();
  console.log(data);

  const getWords = async (wordlist) => {
    let wordsincat = [];
    for (let i = 0; i < wordlist.length; i++) {
      let el = wordlist[i];
      el = el.toLowerCase().replaceAll(' ', '-');
      console.log(el);
      await axios
        .get(
          `/data/phrases/${el}.json`
          // , {
          //   headers: {
          //     'Content-Type': 'application/json',
          //     Accept: 'application/json',
          //   },
          // }
        )
        .then((data) => {
          wordsincat.push(data.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    setPhrases(wordsincat);
  };
  useEffect(() => {
    getWords(data.phrases);
  }, []);

  return (
    <>
      <Container>
        <div className="common-page">
          <h1 className="common-page-title">
            Words By {phraseName}
            <Link className="backToHome float-end" to="/">
              Back to Home
            </Link>
          </h1>
          <Row className="mb-5 justify-content-center_item">
            {phrases &&
              phrases?.map((p, k) => {
                let { English, Farsi, Transliteration, Farsi_Audio } = p;
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
