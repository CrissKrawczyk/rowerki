package pl.rowerki.domain.service;

import pl.rowerki.domain.dto.VehicleDto;

public interface VehicleService {
    VehicleDto createVehicle(VehicleDto vehicleDto);
}