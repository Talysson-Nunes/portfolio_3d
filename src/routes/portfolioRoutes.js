const express = require('express');
const PortfolioController = require('../controllers/PortfolioController');
const { readLimiter, portfolioCreateLimiter } = require('../middlewares/rateLimiter'); // ← NOVO

const router = express.Router();

router.post('/', portfolioCreateLimiter, PortfolioController.create); // ← MODIFICADO
router.get('/student/:studentId', readLimiter, PortfolioController.findByStudent); // ← MODIFICADO

module.exports = router;