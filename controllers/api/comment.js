const router = require("express").Router();

const { User, Post, Comment } = require("../../model");
router.post("/new", async (req, res) => {
  let { comment_details } = req.body;
  try {
    if (!comment_details) {
      res.status(404).json({ message: "comments details required" });
    } else {
      if (!req.session.user_id || !req.session.post_id) {
        return res.json(404).json({ message: "not login or no post id" });
      }
      let newComment = await Comment.create({
        comment_details: comment_details,
        user_id: req.session.user_id,
        comment_postID: req.session.post_id,
      });

      res.status(200).json(newComment);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
