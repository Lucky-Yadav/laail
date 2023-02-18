/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.post('/signup', controller.addPost);
router.post('/signin', controller.addPost);

export = router;