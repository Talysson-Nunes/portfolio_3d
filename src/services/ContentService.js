const { Content } = require('../models');

class ContentService {
  async create(data) {
    // REGRA DE NEGÓCIO (POP 2025): Validação de Seção e Período
    const annualSections = [1, 5, 6, 7]; // Quem Sou Eu, Reflexão Crítica, Conexões, Vida
    const bimonthlySections = [2, 3, 4]; // Fundamentos, Participação, Projetos

    if (annualSections.includes(data.section) && data.period !== 'anual') {
      throw new Error(`A seção ${data.section} é anual. O período deve ser 'anual'.`);
    }
    if (bimonthlySections.includes(data.section) && data.period === 'anual') {
      throw new Error(`A seção ${data.section} é bimestral. O período não pode ser 'anual'.`);
    }

    // REGRA DE NEGÓCIO (POP 2025): Limite de "Páginas" (Conteúdos)
    const existingContents = await Content.findAll({
      where: { portfolio_id: data.portfolio_id, section: data.section, period: data.period }
    });

    if (existingContents.length >= 1) {
      throw new Error(`Já existe uma página para a seção ${data.section} no período ${data.period}. Limite de 1 página atingido.`);
    }

    return await Content.create(data);
  }

  async findByPortfolio(portfolioId) {
    return await Content.findAll({ where: { portfolio_id: portfolioId } });
  }

  async delete(id) {
    const content = await Content.findByPk(id);
    if (!content) throw new Error('Conteúdo não encontrado');
    await content.destroy();
    return true;
  }
}
module.exports = new ContentService();