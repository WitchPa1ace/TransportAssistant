CREATE TABLE IF NOT EXISTS orders (
    id CHAR(36) PRIMARY KEY,
    vehicle_id CHAR(36),
    driver_id CHAR(36),
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    cargo_type VARCHAR(100),
    weight DECIMAL(10, 2),
    status ENUM('pending', 'in-transit', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
    revenue DECIMAL(10, 2) DEFAULT 0,
    start_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_orders_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    CONSTRAINT fk_orders_driver FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
);