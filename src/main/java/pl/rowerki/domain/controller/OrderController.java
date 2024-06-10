package pl.rowerki.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.rowerki.businessLogic.NotEnoughVehiclesException;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.Order;
import pl.rowerki.domain.entity.WorkDay;
import pl.rowerki.domain.service.impl.OrderService;
import pl.rowerki.domain.service.impl.WorkDayService;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private WorkDayService workDayService;

    @RequestMapping(value = "/startNewOrder", method = RequestMethod.POST,
            consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity createOrder(@RequestBody HashMap<String, Object> dataHashMap, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        WorkDay currentWorkDay = workDayService.getCurrentWorkDay(userDetails);
        if (currentWorkDay == null)
            return ResponseEntity.ok(null);
        Location currentLocation = currentWorkDay.getLocation();
        Order savedOrder;
        try {
            savedOrder = orderService.createOrder(dataHashMap, currentLocation);
        } catch (NotEnoughVehiclesException notEnoughVehiclesException) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(notEnoughVehiclesException.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/currentOrders")
    @ResponseBody
    public ResponseEntity<List<Order>> getCurrentOrders(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        WorkDay currentWorkDay = workDayService.getCurrentWorkDay(userDetails);
        if (currentWorkDay == null)
            return ResponseEntity.ok(null);
        Location currentLocation = currentWorkDay.getLocation();
        return ResponseEntity.ok(orderService.getActiveOrdersInLocation(currentLocation));
    }

    @RequestMapping("/finalizeOrder/{id}")
    public void getUserById(@PathVariable("id") Long orderId) {
        orderService.endOrder(orderId);
    }
}
