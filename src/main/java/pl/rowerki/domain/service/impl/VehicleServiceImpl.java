package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.entity.VehicleKind;
import pl.rowerki.domain.exception.ResourceNotFoundException;
import pl.rowerki.domain.repository.VehicleKindRepository;
import pl.rowerki.domain.repository.VehicleRepository;
import pl.rowerki.domain.service.LocationService;
import pl.rowerki.domain.service.VehicleService;

import java.util.List;

@Service
@AllArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private VehicleRepository vehicleRepository;
    private VehicleKindService vehicleKindService;
    private LocationService locationService;

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        setKind(vehicle, vehicle);
        setLocation(vehicle, vehicle);
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
        setKind(updatedVehicle, vehicle);
        setLocation(updatedVehicle, vehicle);
        return vehicleRepository.save(vehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vehicle with id " + id + " not found"));
        vehicleRepository.delete(vehicle);
    }

    private void setKind(Vehicle updatedVehicle, Vehicle vehicle) {
        if (updatedVehicle.getVehicle_kind_id_dup() == null)
            return;
        VehicleKind kind = vehicleKindService.getVehicleKindById(Long.valueOf(updatedVehicle.getVehicle_kind_id_dup()));
        vehicle.setKind(kind);
    }

    private void setLocation(Vehicle updatedVehicle, Vehicle vehicle) {
        if (updatedVehicle.getVehicle_location_id_dup() == null)
            return;
        Location location = locationService.getLocationById(Long.valueOf(updatedVehicle.getVehicle_location_id_dup()));
        vehicle.setLocation(location);
    }
}
