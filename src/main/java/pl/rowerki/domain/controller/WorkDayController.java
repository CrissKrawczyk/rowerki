package pl.rowerki.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import pl.rowerki.businessLogic.DayDataStats;
import pl.rowerki.businessLogic.DayNotStartedException;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.WorkDay;
import pl.rowerki.domain.service.LocationService;
import pl.rowerki.domain.service.impl.OrderService;
import pl.rowerki.domain.service.impl.WorkDayService;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/workDay")
public class WorkDayController {

    @Autowired
    private WorkDayService workDayService;
    @Autowired
    private LocationService locationService;
    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/startNewWorkDay", method = RequestMethod.POST,
            consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity<WorkDay> startNewWorkDay(@RequestBody HashMap<String, Object> dataHashMap, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long locationId = Long.valueOf((Integer) dataHashMap.get("locationId"));
        Location location = locationService.getLocationById(locationId);
        return new ResponseEntity<>(workDayService.startNewWorkDay(location, userDetails), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/endWorkDay", method = RequestMethod.POST)
    @ResponseBody
    public void endWorkDay(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        workDayService.endWorkDay(userDetails);
    }

    @RequestMapping(value = "/getWorkDayStatus", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> getWorkDayStatus(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        WorkDay currentWorkDay = workDayService.getCurrentWorkDay(userDetails);
        if (currentWorkDay == null)
            return ResponseEntity.ok("notStarted");
        if (currentWorkDay.isEnded())
            return ResponseEntity.ok("ended");
        return ResponseEntity.ok("onGoing");
    }

    @RequestMapping(value = "/endDayStats", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> endDayStats(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        WorkDay currentWorkDay = workDayService.getCurrentWorkDay(userDetails);
        if (currentWorkDay == null || !currentWorkDay.isEnded())
            return ResponseEntity.ok(new HashMap<>());
        return ResponseEntity.ok(new DayDataStats(currentWorkDay).getStats());
    }



}
