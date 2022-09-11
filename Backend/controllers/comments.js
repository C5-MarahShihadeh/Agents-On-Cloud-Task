const connection = require("../models/db");

//add to comments  depend on the login | token userId
const addComments = (req, res) => {
  const room_id = req.params.room_id;
  const user_id = req.token.userId;
  const {comment}=req.body;
      const query = `INSERT INTO comments (comment,room_id ,user_id) VALUES (?,?,?);`;
      const data = [comment,room_id, user_id];
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
  


//View comments
const viewComments = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT comment FROM comments INNER JOIN  rooms ON  comments.room_id  =rooms.id WHERE user_id=? AND comments.is_deleted = 0  ;`;
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
      massage: ` comments In rooms `,
      result: result,
    });
  });
};

const viewCommentsByRoomId = (req, res) => {
  const user_id = req.token.userId;
  const room_id = req.params.room_id;

 
  const query = `SELECT comment,user_id,userName FROM comments INNER JOIN  rooms ON  comments.room_id  =rooms.id INNER JOIN users ON comments.user_id =users.id WHERE room_id=? AND comments.is_deleted = 0  ;`;
  const data = [room_id];

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
      massage: ` comments In rooms `,
      result: result,
    });
  });
};
// Remove  comments
const removeComments = (req, res) => {
  const user_id = req.token.userId;
  const room_id = req.params.room_id;

  const query = `UPDATE comments SET is_deleted=1 
    WHERE user_id=? AND room_id=?;`;
  const data = [user_id, room_id];
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
  viewCommentsByRoomId
};
