package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.rowerki.businessLogic.DayNotStartedException;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.entity.VehicleKind;
import pl.rowerki.domain.entity.WorkDay;
import pl.rowerki.domain.exception.ResourceNotFoundException;
import pl.rowerki.domain.repository.VehicleKindRepository;
import pl.rowerki.domain.repository.WorkDayRepository;
import pl.rowerki.domain.service.impl.UserService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class WorkDayService {

    private WorkDayRepository workDayRepository;
    private UserService userService;
    private OrderService orderService;

    public WorkDay getCurrentWorkDay(UserDetails userDetails) {
        String currentLogin = userDetails.getUsername();
        return workDayRepository.getCurrentUserWorkDay(currentLogin);
    }

    public WorkDay startNewWorkDay(Location location, UserDetails userDetails) {
        String currentLogin = userDetails.getUsername();
        User user = userService.getUserByLogin(currentLogin);
        WorkDay workDay = new WorkDay();
        workDay.setDate(LocalDate.now());
        workDay.setEnded(false);
        workDay.setLocation(location);
        workDay.setEmployee(user);
        workDay.setStartTime(LocalTime.now());
        return workDayRepository.save(workDay);
    }

    public void endWorkDay(UserDetails userDetails) {
        WorkDay currentWorkDay = getCurrentWorkDay(userDetails);
        if (currentWorkDay == null)
            return;
        Location currentLocation = currentWorkDay.getLocation();
        if (!orderService.getActiveOrdersInLocation(currentLocation).isEmpty())
            throw new DayNotStartedException("");
        currentWorkDay.setEnded(true);
        currentWorkDay.setEndTime(LocalTime.now());
        workDayRepository.save(currentWorkDay);
    }
}
