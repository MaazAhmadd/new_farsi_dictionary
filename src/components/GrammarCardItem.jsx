import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faVolumeUp } from "@fortawesome/free-solid-svg-icons/faVolumeUp";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Table, Row, Col } from 'reactstrap';
import Defaultwordicon from '../utils/defaultwordicon';
import getcolorfromword from '../utils/getcolorfromword';
import YoutubeEmbed from './YoutubeEmbed';

const GrammarCardItem = () => {
  const { grammarName } = useParams();
  let data = JSON.parse(sessionStorage.getItem('grammarCategories'));
  data = data?.find((dt) => dt.card_name.toLowerCase() === grammarName.toLowerCase());
  //   const [words, setWords] = useState();

  //   const getWords = async (wordlist) => {
  //     let wordsincat = [];
  //     for (let i = 0; i < wordlist.length; i++) {
  //       const el = wordlist[i];
  //       await axios
  //         .get(`/data/words/${el}.json`)
  //         .then((data) => {
  //           wordsincat.push(data.data);
  //         })
  //         .catch((e) => {
  //           console.error(e);
  //         });
  //     }
  //     setWords(wordsincat);
  //   };
  //   useEffect(() => {
  //     getWords(data.words);
  //   }, []);

  return (
    <>
      <Container>
        <div className="common-page">
          <h1 className="common-page-title">
            Grammar By {grammarName}
            <Link className="backToHome float-end" to="/">
              Back to Home
            </Link>
          </h1>
          <Row className="mb-5 justify-content-center_item">
            {data.grammars?.map((w, k) => {
              //   let { English, Farsi, Transliteration, Farsi_Audio } = w;
              return (
                <Col sm={6} xs={12} key={k} className="word-item_c">
                  <div style={{ marginLeft: '30%' }} className="word-item_card">
                    <YoutubeEmbed embedId={w}></YoutubeEmbed>
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

export default GrammarCardItem;
