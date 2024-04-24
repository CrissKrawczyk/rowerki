package pl.rowerki.domain.service;

import pl.rowerki.domain.dto.ReservationDto;
import pl.rowerki.domain.entity.Reservation;

public interface ReservationService {
    ReservationDto createReservation(ReservationDto reservationDto);
}
