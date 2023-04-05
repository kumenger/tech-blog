const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Post, Coment } = require("../../model");
router.post("/signup", async (req, res) => {
  let { first_name, last_name, email, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(404).json({ message: "all fildes required" });
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      console.log(req.body);
      let newUser = await User.create(req.body);

      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).json({ message: "email password required" });
    } else {
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(404).json({ message: "email or pasword not correct" });
      } else {
        checkPwd = await bcrypt.compare(password, user.password);

        if (checkPwd) {
          req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
          
            res
              .status(200)
              .json({
                message: `welcome ${user.first_name} you are now login`,
              });
          });
        } else {
          res.status(404).json({ message: "email or pasword not correct" });
        }
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post('/logout',(req,res)=>{
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {

        res.status(404).end();
      }
})

module.exports = router;
