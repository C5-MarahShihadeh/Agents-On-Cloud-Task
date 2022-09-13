const connection = require("../models/db");

//add to comments  depend on the login | token userId
const addComments = (req, res) => {
  const book_id = req.params.book_id;
  const user_id = req.token.userId;
  const {comment}=req.body;
      const query = `INSERT INTO comments (comment,user_id,book_id) VALUES (?,?,?);`;
      const data = [comment, user_id,book_id];
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
          massage: `comments Added `,
          result: result,
        });
      });
    }
  
    const viewCommentsByBookId = (req, res) => {
      const user_id = req.token.userId;
      const book_id = req.params.book_id;
    
     
      const query = `SELECT comment FROM comments INNER JOIN book ON  comments.book_id  =book.id INNER JOIN users ON comments.user_id =users.id WHERE book_id=? AND comments.is_deleted = 0  ;`;
      const data = [book_id];
    
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
          massage: ` comments by book id `,
          result: result,
        });
      });
    };

//View comments
const viewComments = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT comment FROM comments INNER JOIN  book ON  comments.book_id  =book.id WHERE comments.is_deleted = 0  ;`;

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
      massage: ` All Comments `,
      result: result,
    });
  });
};


// Remove  comments
const removeComments = (req, res) => {
  const user_id = req.token.userId;
  const id = req.params.id;

  const query = `UPDATE comments SET is_deleted=1 
    WHERE user_id=? AND id=?;`;
  const data = [user_id, id];
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
        massage: `comment removed `,
        result: result,
      });
    }
  });
};


module.exports = {
    addComments,
  viewComments,
  removeComments,
  viewCommentsByBookId
  
};
