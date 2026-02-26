const router = require('express').Router();
const {
  userCreateController,
  deleteController,
  getAlluserController,
  refreshController,
  singleUserController,
  updateUserController,
  loginController,
  meController,
  logOutController,
} = require('../controllers/authController');
const { authMiddleware, adminOnly } = require('../middleware/authmiddleware');

router.post('/register', userCreateController);
router.post('/login', loginController);
router.delete('/delete/:id', authMiddleware, adminOnly, deleteController);
router.get('/alluser', authMiddleware, adminOnly, getAlluserController);
router.get('/refresh', refreshController);
router.get('/singleuser/:id', authMiddleware, adminOnly, singleUserController);
router.put('/update/:id', authMiddleware, updateUserController);
router.get('/profile', authMiddleware, meController);
router.post('/logout', authMiddleware, logOutController);

module.exports = router;
