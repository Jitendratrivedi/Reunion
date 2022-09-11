const express = require('express');
const router = express.Router();
const userController=require("../controllers/userController")
const postController=require("../controllers/postController")
const auth=require("../middleware/auth.js")

router.post("/register", userController.createUser)
router.get("/api/user", auth.auth1,userController.getUser)
router.get("/api/authenticate", userController.authenticate)
router.post("/api/post",auth.auth1,postController.createPost)
router.get('/api/posts/:id',postController.getPost)
router.get('/api/posts/all_posts',postController.getallPost)
router.delete("/api/post/delete/:id",auth,postController.deletePost)


module.exports = router;