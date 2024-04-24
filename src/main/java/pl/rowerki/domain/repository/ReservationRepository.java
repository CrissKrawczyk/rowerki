package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.rowerki.domain.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
