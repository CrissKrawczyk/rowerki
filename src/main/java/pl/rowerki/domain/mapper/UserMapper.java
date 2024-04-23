package pl.rowerki.domain.mapper;

import pl.rowerki.domain.dto.UserDto;
import pl.rowerki.domain.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getUserId(),
                user.getLogin(),
                user.getPassword(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getIsAdmin()
        );
    }
    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getUserId(),
                userDto.getLogin(),
                userDto.getPassword(),
                userDto.getEmail(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getIsAdmin()
        );
    }
}
