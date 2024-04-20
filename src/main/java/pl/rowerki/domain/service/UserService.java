package pl.rowerki.domain.service;

import pl.rowerki.domain.dto.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);
}
