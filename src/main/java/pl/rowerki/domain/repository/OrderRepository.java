package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.Order;

import java.util.List;

public interface OrderRepository  extends JpaRepository<Order, Long> {

    @Query("select o from Order o WHERE o.location = :location AND o.orderDate = CURDATE() AND NOT o.isFinalized")
    List<Order> getActiveOrdersInLocation(@Param("location") Location location);

}
