package pl.rowerki.domain.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rowerki.domain.entity.User;
import pl.rowerki.domain.entity.Vehicle;
import pl.rowerki.domain.service.VehicleService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        vehicleService.createVehicle(vehicle);
        return new ResponseEntity<>(null, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable("id") Long vehicleId) {
        Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
        if (vehicle.getKind() != null)
            vehicle.setVehicle_kind_id_dup(vehicle.getKind().getVehicleKindId());
        if (vehicle.getLocation() != null)
            vehicle.setVehicle_location_id_dup(vehicle.getLocation().getLocationId());
        return ResponseEntity.ok(vehicle);
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.getAllVehicles();
        List result = new ArrayList();
        vehicles.forEach(vehicle -> {
            Map parsed = new HashMap();
            parsed.put("uszkodzony", vehicle.getUszkodzony());
            parsed.put("kindId", vehicle.getKind() != null ? vehicle.getKind().getVehicleKindId() : "");
            parsed.put("locationName", vehicle.getLocation() != null ? vehicle.getLocation().getName() : "");
            parsed.put("kindName", vehicle.getKind() != null ? vehicle.getKind().getName() : "");
            parsed.put("vehicleId", vehicle.getVehicleId());
            result.add(parsed);
        });
        return ResponseEntity.ok(result);
    }

    @PutMapping("{id}")
    public ResponseEntity<Vehicle> updateVehicleById(@PathVariable("id") Long vehicleId, @RequestBody Vehicle updatedVehicle) {
        vehicleService.updateVehicle(vehicleId, updatedVehicle);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVehicleById(@PathVariable("id") Long vehicleId) {
        vehicleService.deleteVehicle(vehicleId);
        return ResponseEntity.ok("Vehicle deleted successfully");
    }

}
