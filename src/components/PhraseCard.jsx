import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
// import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

const PhraseCard = () => {
  let data = JSON.parse(sessionStorage.getItem('phrasesCategories'));
  const [phrases, setPhrases] = useState();
  const history = useHistory();
  useEffect(() => {
    setPhrases(data?.slice(0, 4));
  }, []);

  return (
    <Container style={!phrases ? { minHeight: 250 } : {}}>
      <Link to="/phraseCategory">
        <h3 className="mt-5 mb-4 pb-2 text-center">Learn phrases by topics</h3>
      </Link>
      <Row className="mb-5 justify-content-center">
        {phrases &&
          phrases?.map((phrase, key) => {
            return (
              <Col sm={3} xs={6} key={key} className="mb-4">
                <Link
                  className="catCard"
                  to={'/phraseCategory/' + phrase?.card_name.toLowerCase().replaceAll(' ', '-')}
                >
                  <div className="card-image-wrapper" style={{ backgroundColor: phrase?.color }}>
                    <img src={'/category-image/' + phrase?.image} alt={phrase?.card_name} className="" />
                  </div>
                  <span>{phrase?.card_name}</span>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default PhraseCard;
