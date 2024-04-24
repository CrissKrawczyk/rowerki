package pl.rowerki.domain.mapper;

import pl.rowerki.domain.dto.ReservationDto;
import pl.rowerki.domain.entity.Reservation;

public class ReservationMapper {
    public static ReservationDto mapToReservationDto(Reservation reservation) {
        return new ReservationDto(
                reservation.getReservationId(),
                reservation.getLastName(),
                reservation.getTimeStart(),
                reservation.getTimeEnd(),
                reservation.getEmail(),
                reservation.getPhone()
        );
    }
    public static Reservation mapToReservation(ReservationDto reservationDto) {
        return new Reservation(
                reservationDto.getReservationId(),
                reservationDto.getLastName(),
                reservationDto.getTimeStart(),
                reservationDto.getTimeEnd(),
                reservationDto.getEmail(),
                reservationDto.getPhone()
        );
    }
}
