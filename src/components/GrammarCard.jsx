import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { FaGreaterThan } from "react-icons/fa";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

const GrammarCard = () => {
  let data = JSON.parse(sessionStorage.getItem('grammarCategories'));
  const [grammar, setGrammar] = useState();

  useEffect(() => {
    setGrammar(data?.slice(0, 4));
  }, []);

  return (
    <Container style={!grammar ? { minHeight: 250 } : {}}>
      <Link to="/grammarCategory">
        <h3 className="mt-5 mb-4 pb-2 text-center">Learn Grammar</h3>
      </Link>
      <Row className="mb-5 justify-content-center">
        {grammar &&
          grammar.map((g, key) => {
            return (
              <Col sm={3} xs={6} key={key} className="mb-4">
                <Link className="catCard" to={'/grammarCategory/' + g?.card_name}>
                  <div className="card-image-wrapper" style={{ backgroundColor: g?.color }}>
                    <img src={'/category-image/' + g?.image} alt={g?.card_name} className="" />
                  </div>
                  <span>{g?.card_name}</span>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default GrammarCard;
