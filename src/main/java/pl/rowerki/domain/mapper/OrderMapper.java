package pl.rowerki.domain.mapper;

import pl.rowerki.domain.dto.OrderDto;
import pl.rowerki.domain.entity.Order;
import pl.rowerki.domain.entity.Reservation;

public class OrderMapper {
    public static OrderDto mapToOrderDto(Order order) {
        return new OrderDto(
                order.getOrderId(),
                order.getIsFinalized(),
                order.getPrice(),
                order.getReservation() != null ? order.getReservation().getReservationId() : null
        );
    }
    public static Order mapToOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setOrderId(orderDto.getOrderId());
        order.setIsFinalized(orderDto.getIsFinalized());
        order.setPrice(orderDto.getPrice());
        if (orderDto.getReservationId() != null) {
            Reservation reservation = new Reservation();
            reservation.setReservationId(orderDto.getReservationId());
            order.setReservation(reservation);
        }
        return order;
    }
}
