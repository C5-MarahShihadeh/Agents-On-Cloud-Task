import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FavoriteList.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  addbookts,
  deletebookts,
  updatebookts,
  setbooks,
  setbookName,
} from "../../redux/reducers/books";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useDispatch, useSelector } from "react-redux";

const FavoriteList = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const booksState = useSelector((state) => {
    return {
      books: state.books.books,
      bookName: state.books.bookName,
    };
  });

  const favoriteState = useSelector((state) => {
    return {
      favorite: state.favorite.favorite,
    };
  });

  const removeFromfavorite = (id) => {
    axios
      .put(
        `http://localhost:5000/favorite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewfavorite();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const viewfavorite = () => {
    axios
      .get(`http://localhost:5000/favorite/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.success) {
          dispatch(setbooks(result.data.result));
          setShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    viewfavorite();
  }, []);
  return (
    <div className="favorite_container">
     <h4 style={{marginLeft:'1rem',marginTop:'1rem'}}>Your Reading List</h4>
      {isLoggedIn ? (
        <>
          <div className="books">
            {show &&
              booksState.books.map((element, index) => {
                return (
                  <Container>
                    <Card style={{ width: "13rem" }} key={index}>
                      <Card.Img className="img=responsive"
                  style={{ height: "20rem" }}
                  variant="top" src={element.img} />
                      <Card.Body style={{height:'5%'}}>
                        <Card.Title style={{ height: "4rem" }}>{element.bookName}</Card.Title>

                        <Button
                          onClick={() => {
                            removeFromfavorite(element.id);
                          }}
                          variant="primary"
                        >
                          Remove
                        </Button>
                    
                      </Card.Body>
                    </Card>
                    <br/>
                  </Container>
                );
              })}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FavoriteList;
