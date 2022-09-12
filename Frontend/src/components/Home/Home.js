import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { setbooks, setbookName } from "../../redux/reducers/books";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import imge from "./homee.jpg";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { BsHeart,BsCartPlus } from 'react-icons/bs';


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
          className="img-responsive"
          style={{ width: "100%", height: "30rem" }}
          src={imge}
        />
      </div>
      <div className="Book-Continer">
     <h4 className="title">Check Our Books</h4>   
      </div>
<br/>
      <div className="grid">
        {show &&
          books.map((element, index) => {
            return (
              <Container>
                <Card  
                  style={{ width: "18rem", marginBottom: "3rem",cursor:"pointer" }}
                  key={index}
                  className="box"
                >
                  <Card.Img onClick={() => {
                navigate(`/book/${element.id}`);
               

              }}
                    className="img=responsive"
                    style={{ height: "20rem" }}
                    variant="top"
                    src={element.img}
                  />
                  <Card.Body>
                    <Card.Title>{element.bookName}</Card.Title>
                  
                    <Card.Text style={{ height: "2rem" }}>
                      {element.price} JD
                    </Card.Text>
                    {isLoggedIn == true ? (
                      <>
                        <Button style={{marginLeft:"4rem"}}
                          onClick={() => {
                            addToFavoriteList(element.id);
                          }}
                          variant="outline-danger"                        >
                       Favorite <BsHeart/>
                        </Button>
                        <Button style={{marginLeft:".5rem"}}
                          onClick={() => {
                            addToCart(element.id);
                          }}
                          variant="outline-secondary"                        >
                      Cart <BsCartPlus/>
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
                className="back"
                onClick={() => {
                  back();
                }}
              >
                <BsArrowLeftSquareFill className="back" />
              </button>
            </a>
            {page}
            <a href="#l">
              <button
                className="next"
                onClick={() => {
                  next();
                }}
              >
                <BsArrowRightSquareFill className="next" />
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
