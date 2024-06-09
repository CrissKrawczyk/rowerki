package pl.rowerki.businessLogic;

public class DayNotStartedException extends RuntimeException {
    public DayNotStartedException(String message) {
        super(message);
    }
}