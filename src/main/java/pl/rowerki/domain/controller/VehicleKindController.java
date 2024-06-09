package pl.rowerki.domain.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rowerki.domain.entity.VehicleKind;
import pl.rowerki.domain.service.impl.VehicleKindService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/vehicleKinds")
public class VehicleKindController {
    private VehicleKindService vehicleKindService;

    @PostMapping
    public ResponseEntity<VehicleKind> createVehicleKind(@RequestBody VehicleKind vehicleKind) {
        VehicleKind savedVehicleKind = vehicleKindService.createVehicleKind(vehicleKind);
        return new ResponseEntity<>(savedVehicleKind, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<VehicleKind> getVehicleKindById(@PathVariable("id") Long vehicleKindId) {
        VehicleKind vehicleKind = vehicleKindService.getVehicleKindById(vehicleKindId);
        return ResponseEntity.ok(vehicleKind);
    }

    @GetMapping
    public ResponseEntity<List<VehicleKind>> getAllVehicleKinds() {
        List<VehicleKind> vehicleKinds = vehicleKindService.getAllVehicleKinds();
        return ResponseEntity.ok(vehicleKinds);
    }

    @PutMapping("{id}")
    public ResponseEntity<VehicleKind> updateVehicleKindById(@PathVariable("id") Long vehicleKindId, @RequestBody VehicleKind updatedVehicleKind) {
        VehicleKind vehicleKind = vehicleKindService.updateVehicleKind(vehicleKindId, updatedVehicleKind);
        return ResponseEntity.ok(vehicleKind);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVehicleKindById(@PathVariable("id") Long vehicleKindId) {
        vehicleKindService.deleteVehicleKind(vehicleKindId);
        return ResponseEntity.ok("VehicleKind deleted successfully");
    }

}
