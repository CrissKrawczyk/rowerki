package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.entity.VehicleKind;

import java.time.LocalTime;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("select v from Vehicle v WHERE v.location = :location AND v.kind = :kind AND v.isReady")
    public List<Vehicle> findNotUsedVehiclesForKindAndLocation(@Param("location") Location location, @Param("kind") VehicleKind kind);

}
