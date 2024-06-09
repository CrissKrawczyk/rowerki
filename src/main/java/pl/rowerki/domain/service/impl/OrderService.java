package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.rowerki.businessLogic.NewOrderData;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.Order;
import pl.rowerki.domain.repository.OrderRepository;

import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;

    public Order createOrder(HashMap<String, Object> newOrderDataMap) {
        NewOrderData newOrderData = new NewOrderData(newOrderDataMap);
        Order newOrder = newOrderData.createOrder();
        return orderRepository.save(newOrder);
    }

    public List<Order> getActiveOrdersInLocation(Location location) {
        return orderRepository.getActiveOrdersInLocation(location);
    }

    public void endOrder(Long orderId) {
        Order order = orderRepository.getReferenceById(orderId);
        order.getVehicles().forEach(v -> v.setIsReady(true));
        order.setIsFinalized(true);
        orderRepository.save(order);
    }
}
