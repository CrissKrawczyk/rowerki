package pl.rowerki.domain.service;

import pl.rowerki.domain.dto.OrderDto;

public interface OrderService {
    OrderDto createOrder(OrderDto orderDto);
}
