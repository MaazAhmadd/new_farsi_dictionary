import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

export default function PhrasePage() {
  let data = JSON.parse(sessionStorage.getItem('phrasesCategories'));
  const [phrases, setPhrases] = useState();

  useEffect(() => {
    setPhrases(data);
  }, []);
  return (
    <Container style={!phrases ? { minHeight: 250 } : {}}>
      <h4 className="mt-5 mb-4 pb-2 text-center">Topics For Phrases</h4>
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
}
