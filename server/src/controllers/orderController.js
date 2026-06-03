const orderService = require('../services/orderService');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAll();
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderService.create(req.body);
    res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await orderService.updateStatus(req.params.id, status);
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found', code: 404 }
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    next(error);
  }
};