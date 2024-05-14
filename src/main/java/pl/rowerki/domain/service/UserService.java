package pl.rowerki.domain.service;

import pl.rowerki.domain.entity.User;

import java.util.List;

public interface UserService {
    User createUser(User user);

    User getUserById(Long id);

    List<User> getAllUsers();

    User updateUser(Long id, User updatedUser);

    void deleteUser(Long id);

    User getUserByLoginPassword(String login, String password);

}
