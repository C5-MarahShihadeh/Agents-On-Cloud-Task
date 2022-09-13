const connection = require("../models/db");

//add to favorite  depend on the login | token userId
const addToFavorite = (req, res) => {
  const book_id = req.params.book_id;
  const user_id = req.token.userId;
      const query = `INSERT INTO favorite (book_id ,user_id) VALUES (?,?);`;
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
          massage: `Book Added to Favorite`,
          result: result,
        });
      });
    }
  


//View favorite
const viewFavorite = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT book.id, bookName,img FROM favorite INNER JOIN  book ON  favorite.book_id =book.id WHERE favorite.is_deleted = 0  ;`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `books In favorite `,
      result: result,
    });
  });
};
//View favorite
const viewFavoriteByUserId = (req, res) => {
  const user_id = req.params.user_id;

  const query = `SELECT book.id, bookName,img FROM favorite INNER JOIN  book ON  favorite.book_id =book.id WHERE favorite.is_deleted = 0  ;`;

  connection.query(query,  (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `books In favorite `,
      result: result,
    });
  });
};
// Remove book from favorite
const removeFromFavorite = (req, res) => {
  const user_id = req.token.userId;
  const book_id = req.params.book_id;

  const query = `UPDATE favorite SET is_deleted=1 
    WHERE user_id=? AND book_id=?;`;
  const data = [user_id, book_id];
  connection.query(query, data, (error, result) => {
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


// empty favorite

const emptyFavorite = (req, res) => {
  const user_id = req.token.userId;
  const query = `UPDATE favorite SET is_deleted=1 
    WHERE user_id=?;`;
  const data = [user_id];
  connection.query(query, data, (error, result) => {
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `books removed `,
        result: result,
      });
    }
  });
};

module.exports = {
    addToFavorite,
    viewFavorite,
    viewFavoriteByUserId,
    removeFromFavorite,
  emptyFavorite
};
