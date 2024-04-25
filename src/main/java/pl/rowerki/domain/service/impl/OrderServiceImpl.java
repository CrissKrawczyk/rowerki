package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.rowerki.domain.dto.OrderDto;
import pl.rowerki.domain.entity.Order;
import pl.rowerki.domain.mapper.OrderMapper;
import pl.rowerki.domain.repository.OrderRepository;
import pl.rowerki.domain.service.OrderService;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = OrderMapper.mapToOrder(orderDto);
        Order savedOrder = orderRepository.save(order);
        return OrderMapper.mapToOrderDto(savedOrder);
    }
}
