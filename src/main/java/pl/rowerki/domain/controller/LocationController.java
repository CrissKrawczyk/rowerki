package pl.rowerki.domain.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.service.LocationService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private LocationService locationService;

    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location savedLocation = locationService.createLocation(location);
        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") Long locationId) {
        Location location = locationService.getLocationById(locationId);
        return ResponseEntity.ok(location);
    }

    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @PutMapping("{id}")
    public ResponseEntity<Location> updateLocationById(@PathVariable("id") Long locationId, @RequestBody Location updatedLocation) {
        Location location = locationService.updateLocation(locationId, updatedLocation);
        return ResponseEntity.ok(location);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLocationById(@PathVariable("id") Long locationId) {
        locationService.deleteLocation(locationId);
        return ResponseEntity.ok("Location deleted successfully");
    }
}
