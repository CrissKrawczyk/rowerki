package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.rowerki.domain.dto.ReservationDto;
import pl.rowerki.domain.entity.Reservation;
import pl.rowerki.domain.mapper.ReservationMapper;
import pl.rowerki.domain.repository.ReservationRepository;
import pl.rowerki.domain.service.ReservationService;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private ReservationRepository reservationRepository;


    @Override
    public ReservationDto createReservation(ReservationDto reservationDto) {
        Reservation reservation = ReservationMapper.mapToReservation(reservationDto);
        Reservation savedReservation = reservationRepository.save(reservation);
        return ReservationMapper.mapToReservationDto(savedReservation);
    }
}
