const statsService = require('../services/statsService');

exports.getStats = async (req, res) => {
  try {
    const stats = await statsService.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await statsService.getRecentOrders();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMonthlyRevenue = async (req, res) => {
  try {
    const data = await statsService.getMonthlyRevenue();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
