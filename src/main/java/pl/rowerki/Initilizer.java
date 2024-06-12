package pl.rowerki;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.repository.UserRepository;

@Component
public class Initilizer implements CommandLineRunner {

    @Autowired
    UserRepository repository;
    @Autowired
    PasswordEncoder passwordEncoder;



    @Override
    public void run(String... strings) {
        if (!repository.findAll().isEmpty())
            return;
        User user = new User();
        user.setFirstName("user");
        user.setLastName("user");
        user.setPassword(passwordEncoder.encode("user"));
        user.setEmail("user");
        user.setLogin("user");
        this.repository.save(user);
        User admin = new User();
        admin.setFirstName("admin");
        admin.setLastName("admin");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setIsAdmin(true);
        admin.setEmail("admin");
        admin.setLogin("admin");
        this.repository.save(admin);
    }
}