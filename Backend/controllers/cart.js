const connection = require("../models/db");

//add to cart  depend on the login | token userId
const addAndUpdateToCart = (req, res) => {
  let quantity = 1;
  const book_id = req.params.book_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM cart WHERE book_id=? AND user_id=? AND is_deleted = 0 `;
  const data = [book_id, user_id];
  console.log("data", data);
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (result.length) {
      result[0].amount = quantity + result[0].amount;
      const query = `UPDATE cart SET amount=? WHERE book_id=? AND is_deleted = 0`;
      const data = [result[0].amount, result[0].book_id];
      connection.query(query, data, (err, results) => {
        if (results.affectedRows != 0) {
          return res.status(201).json({
            success: true,
            massage: `book Amount Updated +1`,
            result: results,
          });
        } else {
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    } else {
      const query = `INSERT INTO cart (book_id ,user_id) VALUES (?,?);`;
      const data = [book_id, user_id];
      connection.query(query, data, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
        return res.status(200).json({
          success: true,
          massage: `book Added to Cart`,
          result: result,
        });
      });
    }
  });
};

//View Cart
const viewCart = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT book.id, bookName,img,price,amount FROM cart INNER JOIN book ON  cart.book_id =book.id WHERE user_id=? AND cart.is_deleted = 0  ;`;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `Books In Cart `,
      result: result,
    });
  });
};

// Remove book from Cart
const removefromcart = (req, res) => {
  const user_id = req.token.userId;
  const book_id = req.params.book_id;

  const query = `UPDATE cart SET is_deleted=1 
    WHERE user_id=? AND book_id=?;`;
  const data = [user_id, book_id];
  console.log("data", data);
  connection.query(query, data, (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        massage: `book removed `,
        result: result,
      });
    }
  });
};

const removeAndDecreas = (req, res) => {
  let quantity = 1;
  const book_id = req.params.book_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM cart WHERE book_id=? AND user_id=? AND is_deleted=0`;
  const data = [book_id, user_id];
  connection.query(query, data, (err, result) => {
    if (result.length) {
      result[0].amount = result[0].amount - quantity;
      const query = `UPDATE cart SET amount=? WHERE book_id=? AND is_deleted=0 `;
      const data = [result[0].amount, result[0].book_id];
      connection.query(query, data, (err, results) => {
        if (result[0].amount === 0) {
          const book_id = req.params.book_id;

          const query = `UPDATE cart SET is_deleted = 1 WHERE book_id = ?;`;
          const data = [book_id];
          connection.query(query, data, (err, resultss) => {
            if (err) {
              return res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
              });
            } 
          });
        }
        if (results.affectedRows != 0) {
          return res.status(201).json({
            success: true,
            massage: `books Amount Updated -1`,
            result: results,
          });
        } else {
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    }
  });
};

// empty cart

const emptyCart = (req, res) => {
  const user_id = req.token.userId;
  const query = `UPDATE cart SET is_deleted=1 
    WHERE user_id=?;`;
  const data = [user_id];
  connection.query(query, data, (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `Cart is empty `,
        result: result,
      });
    }
  });
};

module.exports = {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
  removeAndDecreas,
  emptyCart,
};
