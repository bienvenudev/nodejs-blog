const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");

router.get("/", (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.status(200).render("index", { title: "All Blogs", blogs });
    })
    .catch((err) => {
      console.log("error here", err);
      res.status(404).render("error", { title: "Not Found" });
    });
});

router.get("/create", (req, res) => {
  res.status(200).render("create", { title: "Create Blog" });
});

router.post("/", (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog.save();

  res.redirect("/");
});

router.delete("/:id", (req, res) => {
  const blogId = req.params.id;

  Blog.findByIdAndDelete(blogId)
    .then((blog) => {
      console.log("the following blog is successfully deleted:", blog);
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err) => {
      console.log("error while deleting blog:", err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((blog) => {
    res.status(200).render("details", { title: "Blog", blog });
  });
});

module.exports = router;
