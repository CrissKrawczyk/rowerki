package pl.rowerki.businessLogic;

public class DayNotEndedException extends RuntimeException {
    public DayNotEndedException(String message) {
        super(message);
    }
}