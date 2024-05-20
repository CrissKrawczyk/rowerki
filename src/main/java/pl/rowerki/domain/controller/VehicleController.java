package pl.rowerki.domain.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.service.VehicleService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Vehicle savedVehicle = vehicleService.createVehicle(vehicle);
        return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable("id") Long vehicleId) {
        Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
        return ResponseEntity.ok(vehicle);
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(vehicles);
    }

    @PutMapping("{id}")
    public ResponseEntity<Vehicle> updateVehicleById(@PathVariable("id") Long vehicleId, @RequestBody Vehicle updatedVehicle) {
        Vehicle vehicle = vehicleService.updateVehicle(vehicleId, updatedVehicle);
        return ResponseEntity.ok(vehicle);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVehicleById(@PathVariable("id") Long vehicleId) {
        vehicleService.deleteVehicle(vehicleId);
        return ResponseEntity.ok("Vehicle deleted successfully");
    }

}
