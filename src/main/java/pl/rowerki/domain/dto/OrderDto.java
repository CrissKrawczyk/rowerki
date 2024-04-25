package pl.rowerki.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.rowerki.domain.entity.Reservation;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long orderId;
    private Boolean isFinalized;
    private Double price;
    private Long reservationId;

}
