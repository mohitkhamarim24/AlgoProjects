import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// Use the JSON and URL-encoded middleware without extended option
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add the extended option

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('DB Connected');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const userSchema  = new mongoose.Schema({
  name : String,
  email : String,
  password : String
})
const User = new mongoose.model("User",userSchema)

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfully", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      await newUser.save();

      res.send({ message: "Successfully Registered", user: newUser });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(9002, () => {
  console.log("Server started at port 9002");
});
