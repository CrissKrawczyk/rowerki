package pl.rowerki.businessLogic;

import pl.rowerki.domain.entity.VehicleKind;

public class NotEnoughVehiclesException extends RuntimeException {
    public NotEnoughVehiclesException(VehicleKind vehicleKind) {
        super("Brak wystarczającej liczby pojazdów typu " + vehicleKind.getName());
    }
}