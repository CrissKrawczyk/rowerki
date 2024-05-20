package pl.rowerki.domain.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.rowerki.domain.entity.Location;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.exception.ResourceNotFoundException;
import pl.rowerki.domain.repository.LocationRepository;
import pl.rowerki.domain.service.LocationService;

import java.util.List;

@Service
@AllArgsConstructor
public class LocationServiceImpl implements LocationService {
    private LocationRepository locationRepository;

    @Override
    public Location getLocationById(Long locationId) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + locationId + " not found"));
        return location;
    }

    @Override
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
    public Location updateLocation(Long id, Location updatedLocation) {
        Location location = locationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location with id " + id + " not found"));
        location.setCity(updatedLocation.getCity());
        location.setName(updatedLocation.getName());
        location.setStreet(updatedLocation.getStreet());
        return locationRepository.save(location);
    }

    @Override
    public void deleteLocation(Long id) {
        Location location = locationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location with id " + id + " not found"));
        locationRepository.delete(location);
    }
}
