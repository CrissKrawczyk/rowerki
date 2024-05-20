package pl.rowerki.domain.service;

import pl.rowerki.domain.entity.Vehicle;

import java.util.List;

public interface VehicleService {
    Vehicle createVehicle(Vehicle vehicle);
    Vehicle getVehicleById(Long id);
    List<Vehicle> getAllVehicles();
    Vehicle updateVehicle(Long id, Vehicle vehicle);
    void deleteVehicle(Long id);
}