import Express from 'express';
import * as PostController from '../controllers/post.controller';
import * as QuandlController from '../controllers/quandl.controller';

const router = Express.Router();

// Get all Posts
router.route('/getPosts').get(PostController.getPosts);

// Get one post by title
router.route('/getPost').get(PostController.getPost);

// Add a new Post
router.route('/addPost').post(PostController.addPost);

// Delete a Post
router.route('/deletePost').post(PostController.deletePost);

router.route('/getData').post(QuandlController.getData);

export default router;
