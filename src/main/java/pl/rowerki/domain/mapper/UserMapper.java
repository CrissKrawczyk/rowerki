package pl.rowerki.domain.mapper;

import pl.rowerki.domain.dto.UserDto;
import pl.rowerki.domain.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getId(),
                user.getLogin(),
                user.getPassword(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
                //,user.getLoggedIn()
        );
    }
    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getId(),
                userDto.getLogin(),
                userDto.getPassword(),
                userDto.getEmail(),
                userDto.getFirstName(),
                userDto.getLastName()
                //,userDto.getLoggedIn()
        );
    }
}
