package pl.rowerki.businessLogic;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import pl.rowerki.SpringAdvancedApplication;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.Order;
import pl.rowerki.domain.entity.WorkDay;
import pl.rowerki.domain.repository.OrderRepository;
import pl.rowerki.domain.service.LocationService;

import static org.junit.Assert.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.MOCK,
        classes = SpringAdvancedApplication.class)
@AutoConfigureMockMvc
public class DayDataStatsTest {

    @Autowired
    LocationService locationService;

    @Autowired
    OrderRepository orderRepository;
    @Test
    public void testDayDataStatsValues() {
        Location location = createLocation();
        createOrder(location, 4.5f);
        createOrder(location, 10f);
        WorkDay workDay = createEndedWorkDay(location);
        DayDataStats dayDataStats = new DayDataStats(workDay);
        assert dayDataStats.getStats().get("money").equals(14.5f);
        assert dayDataStats.getStats().get("workTime").equals("0:15");
    }

    @Test
    public void testDayDataStatsOnNotEndedDay() {
        Location location = createLocation();
        WorkDay workDay = createOngoingWorkDay(location);
        Exception exception = assertThrows(DayNotEndedException.class, () -> {
            new DayDataStats(workDay);
        });
        String expectedMessage = "Nie można wyliczyć podsumowania dla trwającego dnia pracy";
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

    private void createOrder(Location location, float price) {
        Order order1 = new Order();
        order1.setIsFinalized(true);
        order1.setOrderDate(LocalDate.now());
        order1.setLocation(location);
        order1.setStartTime(LocalTime.now());
        order1.setStartTime(LocalTime.now().plusHours(1));
        order1.setVehicles(new ArrayList<>());
        order1.setPrice(price);
        orderRepository.save(order1);
    }

    private WorkDay createEndedWorkDay(Location location) {
        WorkDay workDay = new WorkDay();
        workDay.setDate(LocalDate.now());
        LocalTime workDayStart = LocalTime.now();
        workDay.setStartTime(workDayStart);
        workDay.setEndTime(workDayStart.plusMinutes(15));
        workDay.setLocation(location);
        workDay.setEnded(true);
        return workDay;
    }

    private WorkDay createOngoingWorkDay(Location location) {
        WorkDay workDay = new WorkDay();
        workDay.setDate(LocalDate.now());
        LocalTime workDayStart = LocalTime.now();
        workDay.setStartTime(workDayStart);
        workDay.setLocation(location);
        workDay.setEnded(true);
        return workDay;
    }

}
