const ContentService = require('../services/ContentService');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB

class ContentController {
  async create(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) data.file_path = req.file.path;
      const content = await ContentService.create(data);
      return res.status(201).json(content);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findByPortfolio(req, res) {
    try {
      const contents = await ContentService.findByPortfolio(req.params.portfolioId);
      return res.status(200).json(contents);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  async delete(req, res) {
    try {
      await ContentService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = { ContentController: new ContentController(), upload };