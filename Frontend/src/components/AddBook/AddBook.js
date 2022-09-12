import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { setbooks, setbookName, deletebooks,updatebooks ,addbooks} from "../../redux/reducers/books";


import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function AddBook() {
    const [bookName,setBookName]=useState("");
    const [img,setImg]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const [hide, setHide] = useState(false);
    const [show, setShow] = useState(false);
    const [room, setRoom] = useState([]);
    
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
  
    const addBook=()=>{
        axios
        .post(`http://localhost:5000/book`, {bookName,img,description,price})
        .then((result) => {
          console.log(result.data.result, "addBook");
          dispatch(addbooks(result.data.result));

}) 
        
        .catch((err) => {
          console.log(err);
          setMessage(err.message);
        });
      }
      
  return (
    <Form style={{width:'50%',marginLeft:'25%',marginTop:'10%'}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Name</Form.Label>
        <Form.Control onChange={(e)=>{
setBookName(e.target.value)
        }} type="text" placeholder="Enter Book Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control onChange={(e)=>{
setImg(e.target.value)
        }} type="url" placeholder="Enter Image URL" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={(e)=>{
setDescription(e.target.value)
        }} type="text" placeholder="Enter Book Description" />
         <Form.Label>Price</Form.Label>
        <Form.Control onChange={(e)=>{
setPrice(e.target.value)
        }} type="text" placeholder="Enter Book Price" />
      </Form.Group>
      <Button onClick={(e)=>{
        e.preventDefault()
        addBook()
      }} variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
}

export default AddBook;
 