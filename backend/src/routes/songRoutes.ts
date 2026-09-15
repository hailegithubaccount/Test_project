import { Router } from 'express';
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongStats,
  seedDatabase
} from '../controllers/songController';

const router = Router();

// Stats & Seeding routes (must come before /:id)
router.get('/stats', getSongStats);
router.post('/seed', seedDatabase);

// CRUD routes
router.get('/', getSongs);
router.post('/', createSong);
router.get('/:id', getSongById);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

export default router;
