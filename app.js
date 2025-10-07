require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require("./routes/blogs");

// register view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("connected to db!");
  })
  .catch((err) => {
    console.log("error connecting to db!");
  });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.status(200).render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("error", { title: "Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
