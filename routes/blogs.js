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
  const { title, snippet, body } = req.body;

  if (!title || !snippet || !body) {
    return res
      .status(404)
      .render("error", { title: "All fields are required" });
  }

  const newBlog = new Blog(req.body);

  newBlog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log("Error saving blog:", err);
      res.status(500).render("error", { title: "Failed to save blog" });
    });
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
  Blog.findById(id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).render("error", { title: "Blog Not Found" });
      }
      res.status(200).render("details", { title: "Blog Details", blog });
    })
    .catch((err) => {
      console.log("Error finding blog:", err);
      res.status(500).render("error", { title: "Error" });
    });
});

module.exports = router;
