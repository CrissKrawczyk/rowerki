package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.rowerki.domain.entity.Location;

public interface LocationRepository   extends JpaRepository<Location, Long> {
}
