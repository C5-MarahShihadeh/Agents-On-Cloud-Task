import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineDelete,
} from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GrFormClose } from "react-icons/gr";

import "./cart.css";
import {
  addbookts,
  deletebookts,
  updatebookts,
  setbooks,
  setbookName,
} from "../../redux/reducers/books/index";

import { useDispatch, useSelector } from "react-redux";
import {
  setcart,
  updatecart,
  deleteFromcart,
  addTocart,
  setAmount,
  zeroPrice,
  setPrice,
  decreasePrice,
  zero,
  decrease,
  erase,
  erasePrice,
  renderPrice,
  renderamount,
} from "../../redux/reducers/cart/index";
const Cart = () => {
  const [show, setShow] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [showPay, setShowPay] = useState(false);

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

  const cartState = useSelector((state) => {
    return {
      cart: state.cart.cart,
      amount: state.cart.amount,
      price: state.cart.price,
    };
  });

  const emptycart = () => {
    axios
      .delete(`http://localhost:5000/cart/empty`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        viewcart();
        dispatch(zero());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const removeFromCart = (id) => {
    axios
      .put(
        `http://localhost:5000/cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewcart();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const increaseCart = (id) => {
    axios
      .post(
        `http://localhost:5000/cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewcart();
        dispatch(setAmount());

        setMessage("Added To cart");
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  const decreaseAndRemoveFromcart = (id) => {
    axios
      .put(
        `http://localhost:5000/cart/cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        viewcart();
        dispatch(decrease());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewcart = () => {
    axios
      .get(`http://localhost:5000/cart/`, {
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
  const storgesolve = () => {
    let x = 0;
    let y = 0;
    booksState.books.forEach((element) => {
      x = x + parseInt(element.amount);
      y = y + parseInt(element.price * element.amount);
    });
    dispatch(renderamount(x));
    dispatch(renderPrice(y));
  };
  storgesolve();

  useEffect(() => {
    viewcart();
  }, []);
  return (
    <div className="cart_container">
      {isLoggedIn ? (
        <>
          <div className="books">
            {show &&
              booksState.books.map((element, index) => {
                return (
                  <div> 
                    <Card
                      key={index}
                      style={{ width: "18rem", marginBottom: "3rem" }}
                      className="box"
                    >
                       <CloseButton style={{marginLeft:"16.3rem"}} onClick={() => {
                                  removeFromCart(element.id);
                                  dispatch(erase(element.amount));
                                  dispatch(
                                    erasePrice(element.price * element.amount)
                                  );
                                  viewcart();
                                }} aria-label="Hide" />
                      <Card.Img
                        className="img=responsive"
                        style={{ height: "15rem",marginTop:"1rem" ,width: "17rem",marginLeft:".5rem"}}
                        variant="top"
                        src={element.img}
                      />
                      <Card.Body style={{ height: "rem" }}>
                        <Card.Title>{element.bookName}</Card.Title>
                       
                        <Card.Text >
                          {element.price} JD
                        </Card.Text>
                        {isLoggedIn ? (
                          <>
                            <div className="decrease_increase">
                              <Button variant="outline-dark"
                                className="decrease"
                                onClick={() => {
                                  decreaseAndRemoveFromcart(element.id);
                                  dispatch(decreasePrice(element.price));
                                }}
                              >
                                <AiOutlineMinus  />
                              </Button>
                              <p className="ammount">{element.amount}</p>
                              <Button variant="outline-dark"
                                className="increase"
                                onClick={() => {
                                  increaseCart(element.id);
                                  dispatch(setPrice(element.price));
                                  viewcart();
                                }}
                              >
                                <AiOutlinePlus />
                              </Button>
                            </div>
                            <div className="deletebtn">
                          
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>

          <div className="prices">
            <div className="info">
              Total Items : <span className="span">{cartState.amount}</span>
              <br />
              Total Price : <span className="span">{cartState.price}</span>
              {booksState.books.length ? (
                <div>
                  <button
                    className="emptyButton"
                    onClick={() => {
                      emptycart();
                      dispatch(zeroPrice());
                      viewcart();
                    }}
                  >
                    Empty <AiOutlineDelete className="empty" />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          
        </>
      )}
    </div>
  );
};
export default Cart;
