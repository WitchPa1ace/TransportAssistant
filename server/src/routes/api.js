const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const orderController = require('../controllers/orderController');
const statsController = require('../controllers/statsController');

// Vehicles routes
router.get('/vehicles', vehicleController.getAllVehicles);
router.get('/vehicles/:id', vehicleController.getVehicleById);
router.post('/vehicles', vehicleController.createVehicle);
router.put('/vehicles/:id', vehicleController.updateVehicle);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

// Orders routes
router.get('/orders', orderController.getAllOrders);
router.post('/orders', orderController.createOrder);
router.patch('/orders/:id/status', orderController.updateOrderStatus);

// Stats route
router.get('/stats', statsController.getStats);

module.exports = router;