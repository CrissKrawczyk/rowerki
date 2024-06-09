package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.entity.VehicleKind;
import pl.rowerki.domain.exception.ResourceNotFoundException;
import pl.rowerki.domain.repository.VehicleKindRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class VehicleKindService {

    private VehicleKindRepository vehicleKindRepository;

    public VehicleKind createVehicleKind(VehicleKind vehicleKind) {
        return vehicleKindRepository.save(vehicleKind);
    }

    public VehicleKind getVehicleKindById(Long vehicleKindId) {
        VehicleKind vehicleKind = vehicleKindRepository.findById(vehicleKindId)
                .orElseThrow(() -> new ResourceNotFoundException("VehicleKind with id " + vehicleKindId + " not found"));
        return vehicleKind;
    }

    public List<VehicleKind> getAllVehicleKinds() {
        return vehicleKindRepository.findAll();
    }

    public VehicleKind updateVehicleKind(Long id, VehicleKind updatedVehicleKind) {
        VehicleKind vehicleKind = vehicleKindRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("VehicleKind with id " + id + " not found"));
        vehicleKind.setName(updatedVehicleKind.getName());
        vehicleKind.setSeats(updatedVehicleKind.getSeats());
        vehicleKind.setHourPrice(updatedVehicleKind.getHourPrice());
        vehicleKind.setHalfHourPrice(updatedVehicleKind.getHalfHourPrice());
        return vehicleKindRepository.save(vehicleKind);
    }

    public void deleteVehicleKind(Long id) {
        VehicleKind vehicleKind = vehicleKindRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("VehicleKind with id " + id + " not found"));
        vehicleKindRepository.delete(vehicleKind);
    }
}
