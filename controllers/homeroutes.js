const router = require("express").Router();

const { User, Post, Coment } = require("../model");
router.get("/", async (req, res) => {
  console.log(req.session.logged_in);
  try {
    let allPosts = await Post.findAll({});
    if (!allPosts) {
      res.status(404).json({ message: "no post found" });
    } else {
      const posts = allPosts.map((post) => post.get({ plain: true }));

      res.render("homepage", { posts, logged_in:req.session.logged_in});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  router.post('/logout',(req,res)=>{
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
          res.redirect('/')
        });
      } else {

        res.status(404).end();
      }
})
module.exports = router;
