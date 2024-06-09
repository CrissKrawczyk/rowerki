package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.entity.VehicleKind;
import pl.rowerki.domain.entity.WorkDay;

public interface WorkDayRepository extends JpaRepository<WorkDay, Long> {

    @Query("select d from WorkDay d WHERE d.employee.login = :login AND d.date = CURDATE()")
    WorkDay getCurrentUserWorkDay(@Param("login") String userLogin);

}
