package pl.rowerki.domain.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.rowerki.domain.dto.ReservationDto;
import pl.rowerki.domain.service.ReservationService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private ReservationService reservationService;

    //Add Reservation REST API
    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationDto reservationDto) {
        ReservationDto savedReservation = reservationService.createReservation(reservationDto);
        return new ResponseEntity<>(savedReservation, HttpStatus.CREATED);
    }
}
