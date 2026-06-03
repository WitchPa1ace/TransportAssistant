const vehicleService = require('../services/vehicleService');

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAll();
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    next(error);
  }
};

exports.getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.getById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: { message: 'Vehicle not found', code: 404 }
      });
    }
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
};

exports.createVehicle = async (req, res, next) => {
  try {
    const newVehicle = await vehicleService.create(req.body);
    res.status(201).json({
      success: true,
      data: newVehicle
    });
  } catch (error) {
    next(error);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const updated = await vehicleService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { message: 'Vehicle not found', code: 404 }
      });
    }
    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    const deleted = await vehicleService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: { message: 'Vehicle not found', code: 404 }
      });
    }
    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};