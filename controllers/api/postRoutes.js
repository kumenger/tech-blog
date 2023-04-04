const router = require("express").Router();

const { User, Post, Coment } = require("../../model");
router.post("/newpost", async (req, res) => {
  let { content_details, post_title } = req.body;
  try {
    if (!content_details || !post_title) {
      return res.status(404).json({ message: "post details required" });
    } else {
      let newUser = await Post.create({
        content_details: content_details,
        user_id: req.session.user_id,
        post_title: post_title,
      });

      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/allpost", async (req, res) => {
  try {
    let allPosts = await Post.findAll({});
    if (!allPosts) {
      res.status(404).json({ message: "no post found" });
    } else {
        const posts = allPosts.map((post) =>
        post.get({ plain: true })
      );
      res.render('homepage', 
        {posts}
      );
      //res.json(allPosts)
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    let post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      res.status(404).json({ message: "no post found" });
    } else {
      req.session.save(() => {
        req.session.post_id = post.id;
        res.status(200).json(post);
      });
      console.log(req.session.post_id);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    });

    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
