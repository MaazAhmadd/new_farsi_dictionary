import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { FaGreaterThan } from "react-icons/fa";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

const CategoryCard = () => {
  let data = JSON.parse(sessionStorage.getItem('wordCategories'));
  const [categories, setCategories] = useState();

  useEffect(() => {
    setCategories(data?.slice(0, 4));
  }, []);

  return (
    <Container style={!categories ? { minHeight: 250 } : {}}>
      <Link to="/wordCategory">
        <h3 className="mt-5 mb-4 pb-2 text-center">Learn words by topics</h3>
      </Link>
      <Row className="mb-5 justify-content-center">
        {categories &&
          categories.map((category, key) => {
            return (
              <Col sm={3} xs={6} key={key} className="mb-4">
                <Link className="catCard" to={'/wordCategory/' + category?.card_name}>
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
};

export default CategoryCard;
