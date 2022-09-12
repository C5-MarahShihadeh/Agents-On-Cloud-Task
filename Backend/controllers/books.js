const connection = require("../models/db");

const createNewbook = (req, res) => {
  const { bookName, img, description,price} = req.body;
  const query = `INSERT INTO book (bookName,
    img,
    description,price
  ) VALUES (?,?,?,?);`;
  const data = [bookName, img, description,price];
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
      massage: "books created",
      result: result,
    });
  });
};

const getAllbooksss = (req, res) => {


  const query = `SELECT * FROM book WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    return res.status(200).json({
      success: true,
      massage: "All the book",
      result: result,
    });
  });
};


const getBookById = (req, res) => {
  const id = req.params.id;


  const query = `SELECT * FROM book WHERE id=? AND is_deleted=0`;
  const data = [id];


  connection.query(query,data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    return res.status(200).json({
      success: true,
      massage: "Book By Id",
      result: result,
    });
  });
};


const getAllbook = (req, res) => {
  // limit as 6
  const limit = 6;
  // page number
  const page = req.query.page;
  // calculate offset
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM book WHERE is_deleted=0  limit ${limit} OFFSET ${offset};`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        massage: "final page",
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the book",
      result: { result, page_number: page },
    });
  });
};

const deletebookById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE book SET is_deleted=1 WHERE id=?;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `!! No book deleted`,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `Deleted book`,
      result: result,
    });
  });
};

const updatebookById = (req, res) => {
  const { bookName, img, description,price } = req.body;
  const id = req.params.id;

  const query = `SELECT * FROM book WHERE id=?`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (result.length==0) {
      return res.status(404).json({
        success: false,
        massage: `The book: ${id} is not found`,
        err: err,
      });
    } else {
      const query = `UPDATE book SET bookName=?,img=?,description=?,price=? WHERE id=?`;
      const data = [
        bookName || result[0].bookName,
        img || result[0].img,
        description || result[0].description,
        price || result[0].price,

        id,
      ];
      connection.query(query, data, (err, result) => {
        if (result.affectedRows != 0)

          res.status(201).json({
            success: true,
            massage: `book updated`,
            result: result,
          });
        
      });
    }
  });
};



const getbooksByTitle = (req, res) => {
  let bookName = req.query.bookName;

  const query = `SELECT * FROM book
   WHERE is_deleted=0 AND 
    bookName LIKE ?;`;
  const data = [`%${bookName}%`];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the book",
      result: result,
    });
  });
};


module.exports = {
  getAllbook,
  createNewbook,
  deletebookById,
  updatebookById,
  getbooksByTitle,
  getAllbooksss,
  getBookById
};
