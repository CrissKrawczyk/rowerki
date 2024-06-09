package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.entity.VehicleKind;

public interface VehicleKindRepository extends JpaRepository<VehicleKind, Long> {
}
