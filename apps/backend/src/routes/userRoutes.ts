import express from 'express';
import * as UserController from '../controllers/userControllers.js';
import { requiresAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requiresAuth, UserController.getAuthenticatedUser);

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

export default router;
