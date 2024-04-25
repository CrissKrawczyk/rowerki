package pl.rowerki.domain.mapper;

import pl.rowerki.domain.dto.VehicleDto;
import pl.rowerki.domain.entity.Vehicle;

public class VehicleMapper {
    public static VehicleDto mapToVehicleDto(Vehicle vehicle) {
        return new VehicleDto(
                vehicle.getVehicleId(),
                vehicle.getUszkodzony(),
                vehicle.getLocationId()
        );
    }
    public static Vehicle mapToVehicle(VehicleDto vehicleDto) {
        return new Vehicle(
                vehicleDto.getId(),
                vehicleDto.getUszkodzony(),
                vehicleDto.getLocationId()
        );
    }
}
