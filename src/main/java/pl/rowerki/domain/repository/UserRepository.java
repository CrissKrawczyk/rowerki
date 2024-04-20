package pl.rowerki.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.rowerki.domain.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {}
