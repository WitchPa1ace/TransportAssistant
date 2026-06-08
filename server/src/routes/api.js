const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const orderController = require('../controllers/orderController');
const statsController = require('../controllers/statsController');
const driverController = require('../controllers/driverController');

// Vehicles routes
router.get('/vehicles', vehicleController.getAllVehicles);
router.get('/vehicles/for-select', vehicleController.getVehiclesForSelect);  // ← СПЕЦИФИЧНЫЙ ПЕРЕД :id
router.get('/vehicles/:id', vehicleController.getVehicleById);
router.post('/vehicles', vehicleController.createVehicle);
router.put('/vehicles/:id', vehicleController.updateVehicle);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

// Orders routes
router.get('/orders', orderController.getAllOrders);
router.post('/orders', orderController.createOrder);
router.patch('/orders/:id/status', orderController.updateOrderStat);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

// Drivers routes
router.get('/drivers', driverController.getAllDrivers);
router.get('/drivers/for-select', driverController.getDriversForSelect);  // ← СПЕЦИФИЧНЫЙ ПЕРЕД :id
router.get('/drivers/:id', driverController.getDriverById);
router.post('/drivers', driverController.createDriver);
router.put('/drivers/:id', driverController.updateDriver);
router.delete('/drivers/:id', driverController.deleteDriver);

// Stats routes
router.get('/stats', statsController.getStats);
router.get('/stats/recent-orders', statsController.getRecentOrders);
router.get('/stats/monthly-revenue', statsController.getMonthlyRevenue);

module.exports = router;