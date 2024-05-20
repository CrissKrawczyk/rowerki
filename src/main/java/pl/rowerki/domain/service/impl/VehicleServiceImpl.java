package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.exception.ResourceNotFoundException;
import pl.rowerki.domain.repository.VehicleRepository;
import pl.rowerki.domain.service.VehicleService;

import java.util.List;

@Service
@AllArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private VehicleRepository vehicleRepository;

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle getVehicleById(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle with id " + vehicleId + " not found"));
        return vehicle;
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vehicle with id " + id + " not found"));
        vehicle.setLocation(updatedVehicle.getLocation());
        vehicle.setUszkodzony(updatedVehicle.getUszkodzony());
        return vehicleRepository.save(vehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vehicle with id " + id + " not found"));
        vehicleRepository.delete(vehicle);
    }
}
