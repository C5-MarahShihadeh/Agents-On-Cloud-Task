const connection = require("../models/db");
const bcrypt = require("bcrypt");
const salt = 10;

const register = async (req, res) => {
  const { userName, email, password, role_id } =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users ( userName, email, password, role_id) VALUES (?,?,?,?)`;
  const data = [
    userName,
    email.toLowerCase(),
    encryptedPassword,
    role_id,
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      
    return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err
      });
    }
 return res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result
    });
  });
};

module.exports = {
  register,
};
