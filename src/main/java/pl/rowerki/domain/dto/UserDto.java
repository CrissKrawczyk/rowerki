package pl.rowerki.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String login;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private Boolean isAdmin;
}
