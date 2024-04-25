package pl.rowerki.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.rowerki.domain.entity.Order;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Long reservationId;
    private String lastName;
    private LocalDateTime timeStart;
    private LocalDateTime timeEnd;
    private String email;
    private String phone;
}
