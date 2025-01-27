const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const AdminAuth = (req, res, next) => {
//   console.log("Admin Auth is being checked");

//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";

//   if (!isAdminAuthorized) {
//     res.status(401).send("Unauthorized request");
//   } else {
//     next();
//   }
// };

const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not found");
    } 

    const decodedObj = await jwt.verify(token, "mysecretkey");
    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Token not found"); 
  }
};

module.exports = {
  //AdminAuth,
  UserAuth,
};
