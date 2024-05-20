package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.rowerki.domain.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
