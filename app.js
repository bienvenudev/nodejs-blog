const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes = require("./routes/blogs");

// register view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const dbURI =
  "mongodb+srv://bienvenu:bienvenu123@blogcluster.kgzxnms.mongodb.net/blogcluster?retryWrites=true&w=majority&appName=blogcluster";

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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
