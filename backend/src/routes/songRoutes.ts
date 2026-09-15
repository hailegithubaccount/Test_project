import { Router } from 'express';
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongStats,
} from '../controllers/songController';

const router = Router();

// Stats route (must come before /:id)
router.get('/stats', getSongStats);

// CRUD routes
router.get('/', getSongs);
router.post('/', createSong);
router.get('/:id', getSongById);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;
