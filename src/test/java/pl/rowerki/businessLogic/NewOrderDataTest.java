package pl.rowerki.businessLogic;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.rowerki.SpringAdvancedApplication;
import pl.rowerki.domain.entity.*;
import pl.rowerki.domain.service.LocationService;
import pl.rowerki.domain.service.VehicleService;
import pl.rowerki.domain.service.impl.VehicleKindService;

import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        classes = SpringAdvancedApplication.class)
@AutoConfigureMockMvc
public class NewOrderDataTest {

    @Autowired
    LocationService locationService;

    @Autowired
    VehicleKindService kindService;

    @Autowired
    VehicleService vehicleService;

    @Test
    @Transactional
    public void calcPriceTest() {
        Location location = createLocation();
        VehicleKind vehicleKind = createKind();
        createVehicle(vehicleKind, location);
        createVehicle(vehicleKind, location);
        HashMap<String, Object> newOrderDataMap = new HashMap<>();
        newOrderDataMap.put("isFullHour", true);
        newOrderDataMap.put("kind_" + vehicleKind.getVehicleKindId(), 2);
        NewOrderData newOrderData = new NewOrderData(newOrderDataMap, location);
        assert newOrderData.calcPrice() == 10;
    }

    @Test
    @Transactional
    public void createOrderTest() {
        Location location = createLocation();
        VehicleKind vehicleKind = createKind();
        createVehicle(vehicleKind, location);
        createVehicle(vehicleKind, location);
        HashMap<String, Object> newOrderDataMap = new HashMap<>();
        newOrderDataMap.put("isFullHour", true);
        newOrderDataMap.put("kind_" + vehicleKind.getVehicleKindId(), 2);
        NewOrderData newOrderData = new NewOrderData(newOrderDataMap, location);
        Order order = newOrderData.createOrder();
        assert order.getPrice() == 10;
        assert order.getVehicles().size() == 2;
        assert !order.getIsFinalized();
        assert order.getLocation() == location;
    }

    @Test
    @Transactional
    public void findVehiclesTest() {
        Location location = createLocation();
        VehicleKind vehicleKind = createKind();
        Vehicle vehicle1 = createVehicle(vehicleKind, location);
        Vehicle vehicle2 = createVehicle(vehicleKind, location);
        HashMap<String, Object> newOrderDataMap = new HashMap<>();
        newOrderDataMap.put("isFullHour", true);
        newOrderDataMap.put("kind_" + vehicleKind.getVehicleKindId(), 2);
        NewOrderData newOrderData = new NewOrderData(newOrderDataMap, location);
        List<Vehicle> vehicleList = newOrderData.findVehicles();
        assert vehicleList.size() == 2;
        assert vehicleList.contains(vehicle1);
        assert vehicleList.contains(vehicle2);
    }

    @Test
    @Transactional
    public void throwExceptionOnNotEnoughVehiclesTest() {
        Location location = createLocation();
        VehicleKind vehicleKind = createKind();
        createVehicle(vehicleKind, location);
        HashMap<String, Object> newOrderDataMap = new HashMap<>();
        newOrderDataMap.put("isFullHour", true);
        newOrderDataMap.put("kind_" + vehicleKind.getVehicleKindId(), 2);
        NewOrderData newOrderData = new NewOrderData(newOrderDataMap, location);
        Exception exception = assertThrows(NotEnoughVehiclesException.class, newOrderData::findVehicles);
        String expectedMessage = "Brak wystarczającej liczby pojazdów typu " + vehicleKind.getName();
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }

    private Location createLocation() {
        Location location = new Location();
        location.setCity("city");
        location.setName("name");
        location.setStreet("street");
        location.setStreetNum(2);
        locationService.createLocation(location);
        return location;
    }

    private VehicleKind createKind() {
        VehicleKind kind = new VehicleKind();
        kind.setHalfHourPrice(3);
        kind.setHourPrice(5);
        kind.setSeats(2);
        kind.setName("kind");
        kindService.createVehicleKind(kind);
        return kind;
    }

    private Vehicle createVehicle(VehicleKind kind, Location location) {
        Vehicle vehicle = new Vehicle();
        vehicle.setIsReady(true);
        vehicle.setKind(kind);
        vehicle.setLocation(location);
        vehicle.setUszkodzony(false);
        vehicleService.createVehicle(vehicle);
        return vehicle;
    }

}
