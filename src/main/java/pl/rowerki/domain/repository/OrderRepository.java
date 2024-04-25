package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.rowerki.domain.entity.Order;

public interface OrderRepository  extends JpaRepository<Order, Long> {
}
