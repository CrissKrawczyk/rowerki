package pl.rowerki.domain.service;

import pl.rowerki.domain.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(Long id);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long id, UserDto updatedUser);

    void deleteUser(Long id);

}
