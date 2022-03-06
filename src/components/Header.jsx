import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Logo from "../Images/logoipsum.svg";
// import { useUserContext } from '../contexts/user_context';
import { FaUserMinus, FaUserPlus, FaHeart } from "react-icons/fa";

const Header = () => {
  let myUser = localStorage.getItem("token");
  // const { loginWithRedirect, myUser, logout } = useUserContext();
  return (
    <Container style={{ height: "50px" }} className="">
      <header className="site-header">
        <Row
          style={{ height: "100%" }}
          className="justify-content-center align-self-center align-items-center"
        >
          <Col className="site-header-left">
            <Link to="/" className="logo">
              <img src={Logo} alt="" />
            </Link>
          </Col>
          <Col className="site-header-right">
            {myUser ? (
              <div className="fav_word_icon">
                <Link to="/fav_words">
                  <FaHeart />
                </Link>
                <button
                  type="button"
                  className="auth-btn"
                  onClick={() => {
                    // logout();
                    localStorage.removeItem("token");
                    window.location = "/";
                  }}
                >
                  Logout <FaUserMinus />
                </button>
              </div>
            ) : (
              <Link type="button" className="auth-btn" to="/login">
                Login <FaUserPlus />
              </Link>
            )}
          </Col>
        </Row>
      </header>
    </Container>
  );
};

export default Header;
