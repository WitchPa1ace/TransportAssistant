const statsService = require('../services/statsService');

exports.getStats = async (req, res, next) => {
  try {
    const stats = await statsService.getDashboardStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};