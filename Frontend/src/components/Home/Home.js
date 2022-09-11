import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { setbooks, setbookName } from "../../redux/reducers/books";
import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "./homee.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

const Homepage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const { books } = useSelector((state) => {
    return {
      books: state.books.books,
      bookName: state.books.bookName,
    };
  });
  


  const addToCart = (String) => {
    axios
      .post(
        `http://localhost:5000/cart/${String}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };

  const addToFavoriteList = (String) => {
    axios
      .post(
        `http://localhost:5000/favorite/${String}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };

  const gatAllbooks = () => {
    axios
      .get(`http://localhost:5000/book/?page=${page}`)
      .then((result) => {
        console.log(result.data.result.result);
        dispatch(setbooks(result.data.result.result));
        setMessage(result.data.message);
        setShow(true);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const next = () => {
    axios
      .get(`http://localhost:5000/book/?page=${page + 1}`)
      .then((result) => {
        if (result.data.result.result.length !== 0) {
          dispatch(setbooks(result.data.result.result));
          setPage(page + 1);
          setShow(true);
          console.log(page);
        } else {
          return setPage(page);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const back = () => {
    axios
      .get(`http://localhost:5000/book/?page=${page - 1}`)
      .then((result) => {
        if (result.data.result.result.length !== 0) {
          dispatch(setbooks(result.data.result.result));
          setPage(page - 1);
          setShow(true);
          console.log(page);
        } else {
          setPage(page);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    gatAllbooks();
  }, []);

  return (
    <div className="hj">
      <div>
        <img
          className="img=responsive"
          style={{ width: "100%", height: "30rem" }}
          src={img}
        />
      </div>
      <div className="Book-Continer"></div>

      <div className="grid">
        {show &&
          books.map((element, index) => {
            return (
              <Container>
                <Card
                  style={{ width: "18rem", marginBottom: "3rem" }}
                  key={index}
                  className="box"
                >
                  <Card.Img
                    className="img=responsive"
                    style={{ height: "20rem" }}
                    variant="top"
                    src={element.img}
                  />
                  <Card.Body>
                    <Card.Title>{element.bookName}</Card.Title>
                    <Card.Text style={{ height: "8rem" }}>
                      {element.description}
                    </Card.Text>
                    <Card.Text style={{ height: "2rem" }}>
                      {element.price} JD
                    </Card.Text>
                    {isLoggedIn == true ? (
                      <>
                        <Button
                          onClick={() => {
                            addToFavoriteList(element.id);
                          }}
                          variant="primary"
                        >
                          Add To Favorite
                        </Button>
                        <Button
                          onClick={() => {
                            addToCart(element.id);
                          }}
                          variant="primary"
                        >
                          Add To Cart
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Card.Body>
                </Card>
              </Container>
            );
          })}
      </div>

      {hide ? (
        <></>
      ) : (
        <>
          <div className="pagenation">
            <a href="#l">
              <button
                className="bttt3"
                onClick={() => {
                  back();
                }}
              >
                <BsArrowLeftSquareFill className="bttt3" />
              </button>
            </a>
            {page}
            <a href="#l">
              <button
                className="bttt3"
                onClick={() => {
                  next();
                }}
              >
                <BsArrowRightSquareFill className="bttt3" />
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
