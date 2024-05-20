package pl.rowerki.domain.service;

import pl.rowerki.domain.entity.Location;

import java.util.List;

public interface LocationService {
    Location getLocationById(Long id);
    Location createLocation(Location location);
    List<Location> getAllLocations();
    Location updateLocation(Long id, Location location);
    void deleteLocation(Long id);
}
