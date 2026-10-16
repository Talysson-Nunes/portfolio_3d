const express = require('express');
const { ContentController, upload } = require('../controllers/ContentController');
const router = express.Router();

router.post('/', upload.single('file'), ContentController.create);
router.get('/portfolio/:portfolioId', ContentController.findByPortfolio);
router.delete('/:id', ContentController.delete);

module.exports = router;