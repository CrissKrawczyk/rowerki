package pl.rowerki;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.repository.UserRepository;

@Component
public class Initilizer implements CommandLineRunner {

    private final UserRepository repository;

    @Autowired
    public Initilizer(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        if (!repository.findAll().isEmpty())
            return;
        User user = new User();
        user.setFirstName("user");
        user.setLastName("user");
        user.setPassword("user");
        user.setEmail("user");
        user.setLogin("user");
        this.repository.save(user);
    }
}