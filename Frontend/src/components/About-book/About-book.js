import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./About-book.css";
import { setbooks, setbookName, updatebooks } from "../../redux/reducers/books";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

function ImgOverlayExample() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  let { id } = useParams();
  const [show, setShow] = useState(false);
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [book, setBook] = useState([]);
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
  const gatBookById = () => {
    axios
      .get(`http://localhost:5000/book/${id}`)
      .then((result) => {
        console.log(result.data.result);
        setBook(result.data.result);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const updatebooks = (String) => {
    axios
      .put(
        `http://localhost:5000/book/update/${String}`,
        {bookName,img,description,price},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(updatebooks(result.data.result))
        gatBookById();
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };
  useEffect(() => {
    gatBookById();
  }, []);

  return (
    <div>
      {book &&
        book.map((element, index) => {
          return (
            <Card
              key={index}
              style={{ width: "50rem", marginLeft: "23.5%", marginTop: "3%" }}
            >
              <Card.Img
                style={{ width: "100%", height: "25rem" }}
                variant="top"
                src={element.img}
              />
              <Card.Body>
                <Card.Title>{element.bookName}</Card.Title>
                <Card.Text>{element.description}</Card.Text>
                <Card.Text>{element.price} JD</Card.Text>
                <>
                  <Button onClick={handleShow} variant="primary">
                    Edit
                  </Button>
                  <Modal
                    style={{ marginTop: "10%" }}
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit your book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <label>Book Name</label>
                      <br />
                      <input onChange={(e)=>{
setBookName(e.target.value);
                      }}
                        style={{ width: "25rem", marginBottom: "2rem" }}
                      />{" "}
                      <br />
                      <label>Book Image URL</label>
                      <br />
                      <input   onChange={(e)=>{
setImg(e.target.value);
                      }}
                        style={{ width: "25rem", marginBottom: "2rem" }}
                      />{" "}
                      <br />
                      <label>Book description</label>
                      <br />
                      <input  onChange={(e)=>{
setDescription(e.target.value);
                      }}
                        style={{ width: "25rem", marginBottom: "2rem" }}
                      />{" "}
                      <br />
                      <label>Book price</label>
                      <br />
                      <input  onChange={(e)=>{
setPrice(e.target.value);
                      }} style={{ width: "25rem", marginBottom: "2rem" }} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button onClick={()=>{
                        updatebooks(element.id);
                        handleClose();
                      }} variant="primary">Confirm</Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default ImgOverlayExample;
