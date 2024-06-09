package pl.rowerki.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, updatable = false, nullable = false)
    private Long orderId;

    @Column(name = "is_finalized")
    private Boolean isFinalized;

    @Column
    private Float price;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @DateTimeFormat(pattern = "HH:mm:ss")
    @Column
    private LocalTime startTime;

    @DateTimeFormat(pattern = "HH:mm:ss")
    @Column
    private LocalTime endTime;

    @DateTimeFormat(pattern = "DD-MM-YYYY")
    @Column
    private LocalDate orderDate;

    @ManyToMany
    @JoinTable(
            name = "vehicle_in_order",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "vehicle_id"))
    private List<Vehicle> vehicles;

    @PrePersist
    private void setVehiclesAsUsed() {
        for (Vehicle vehicle : vehicles)
            vehicle.setIsReady(false);
    }
}
