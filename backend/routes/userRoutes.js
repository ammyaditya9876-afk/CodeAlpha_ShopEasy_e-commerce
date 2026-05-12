import express from 'express';
const router = express.Router();
import {
  syncFirebaseUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/auth', protect, syncFirebaseUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
