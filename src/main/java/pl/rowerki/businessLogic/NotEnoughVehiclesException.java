package pl.rowerki.businessLogic;

public class NotEnoughVehiclesException extends RuntimeException {
    public NotEnoughVehiclesException(String message) {
        super(message);
    }
}