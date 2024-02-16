require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./server/data/utils/db.js");
const session = require('express-session');
const passport = require('./auth/passport-config.js')

// Import DAO modules
const CartDao = require("./server/data/mongo/carts.dao.js");
const ProductDao = require("./server/data/mongo/products.dao.js");
// Import UserDao module
const UserDao = require("./server/data/mongo/users.dao.js");

mongoose.connect(process.env.DB_LINK, {
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as the view engine
const hbs = exphbs.create({
  defaultLayout: 'main',
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Initialize Passport and session middleware
const sessionMiddleware = session({ secret: 'your-secret-key', resave: true, saveUninitialized: true });
app.use(sessionMiddleware);

// Require Passport configuration
require('./auth/passport-config.js')(passport);

// Route to handle user registration
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Add validation for email and password

    const newUser = await UserDao.createUser({ email, password, role: "usuario" });
    res.json({ status: "success", message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Route to handle user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/", // You can change this to the desired success redirect path
  failureRedirect: "/login", // You can change this to the desired failure redirect path
  failureFlash: true,
}), async (req, res) => {
  try {
    // Add validation for email and password

    const user = await UserDao.authenticateUser(req.body.email, req.body.password);

    if (!user) {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
      return;
    }

    req.session.user = user;
    res.json({ status: "success", message: "Login successful", user: req.user });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Route to handle user logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
      return;
    }

    res.redirect("/login");
  });
});

// Start the server
const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
