package pl.rowerki.businessLogic;

import org.springframework.beans.factory.annotation.Autowired;
import pl.rowerki.ContextAwareClass;
import pl.rowerki.domain.controller.VehicleController;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.Order;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.entity.VehicleKind;
import pl.rowerki.domain.repository.VehicleRepository;
import pl.rowerki.domain.service.LocationService;
import pl.rowerki.domain.service.impl.VehicleKindService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NewOrderData {

    private LocationService locationService;
    private VehicleKindService vehicleKindService;
    private VehicleRepository vehicleRepository;

    private Location location;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate orderDate;
    private boolean isFullHour;
    private Map<VehicleKind, Integer> usedKinds = new HashMap<>();

    public NewOrderData(HashMap<String, Object> newOrderData, Location currrentLocation) {
        this.vehicleKindService = ContextAwareClass.getBean(VehicleKindService.class);
        this.vehicleRepository = ContextAwareClass.getBean(VehicleRepository.class);
        this.location = currrentLocation;
        this.startTime = LocalTime.now();
        isFullHour = (boolean) newOrderData.get("isFullHour");
        this.endTime = startTime.plusMinutes(isFullHour ? 60 : 30);
        this.orderDate = LocalDate.now();
        List<VehicleKind> kinds = vehicleKindService.getAllVehicleKinds();
        kinds.forEach(kind -> {
            int kindQuantity = (int) newOrderData.get("kind_" + kind.getVehicleKindId());
            usedKinds.put(kind, kindQuantity);
        });
    }

    public Order createOrder() {
        Order newOrder = new Order();
        newOrder.setIsFinalized(false);
        newOrder.setPrice(calcPrice());
        newOrder.setOrderDate(orderDate);
        newOrder.setLocation(location);
        newOrder.setStartTime(startTime);
        newOrder.setEndTime(endTime);
        List<Vehicle> vehicleList = findVehicles();
        newOrder.setVehicles(vehicleList);
        return newOrder;
    }

    private Float calcPrice() {
        return usedKinds.entrySet().stream().map((e) -> {
            VehicleKind kind = e.getKey();
            float kindPrice = isFullHour ? kind.getHourPrice() : kind.getHalfHourPrice();
            return kindPrice * e.getValue();
        })
                .reduce(0f, Float::sum);
    }

    public List<Vehicle> findVehicles() {
        List<Vehicle> vehicles = new ArrayList<>();
        usedKinds.forEach((k, v) -> {
            List<Vehicle> kindVehicles = vehicleRepository.findNotUsedVehiclesForKindAndLocation(location, k);
            if (kindVehicles.size() < v)
                throw new NotEnoughVehiclesException(k);
            vehicles.addAll(kindVehicles.subList(0, v));
        });
        return vehicles;
    }

}
