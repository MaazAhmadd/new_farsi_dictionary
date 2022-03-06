import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

export default function GrammarPage() {
  let data = JSON.parse(sessionStorage.getItem('grammarCategories'));
  const [grammar, setGrammar] = useState();

  useEffect(() => {
    setGrammar(data);
  }, []);
  return (
    <Container style={!grammar ? { minHeight: 250 } : {}}>
      <h4 className="mt-5 mb-4 pb-2 text-center">Topics For Grammar</h4>
      <Row className="mb-5 justify-content-center">
        {grammar &&
          grammar?.map((category, key) => {
            return (
              <Col sm={3} xs={6} key={key} className="mb-4">
                <Link className="catCard" to={'/grammarCategory/' + category?.card_name}>
                  <div className="card-image-wrapper" style={{ backgroundColor: category?.color }}>
                    <img src={'/category-image/' + category?.image} alt={category?.card_name} className="" />
                  </div>
                  <span>{category?.card_name}</span>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}
