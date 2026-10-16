const { Review, User } = require('../models');

class ReviewService {
  async create(data) {
    // REGRA DE NEGÓCIO: Apenas professores podem avaliar
    const teacher = await User.findByPk(data.teacher_id);
    if (!teacher || teacher.role !== 'teacher') {
      throw new Error('Apenas usuários com perfil de professor podem avaliar portfólios.');
    }
    return await Review.create(data);
  }

  async findByPortfolio(portfolioId) {
    return await Review.findAll({
      where: { portfolio_id: portfolioId },
      include: [{ model: User, as: 'teacher', attributes: ['id', 'name'] }]
    });
  }
}
module.exports = new ReviewService();