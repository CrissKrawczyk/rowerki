package pl.rowerki.businessLogic;

import pl.rowerki.ContextAwareClass;
import pl.rowerki.domain.entity.Order;
import pl.rowerki.domain.entity.WorkDay;
import pl.rowerki.domain.service.impl.OrderService;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

public class DayDataStats {

    private String workTime;
    private float moneyEarned;

    public DayDataStats(WorkDay workDay) {
        if (workDay.getEndTime() == null)
            throw new DayNotEndedException("Nie można wyliczyć podsumowania dla trwającego dnia pracy");
        long minutes = workDay.getStartTime().until(workDay.getEndTime(), ChronoUnit.MINUTES);
        workTime = String.format("%d:%02d", minutes / 60, minutes % 60);
        OrderService orderService = ContextAwareClass.getBean(OrderService.class);
        moneyEarned = orderService.getFinalizedOrdersInLocation(workDay.getLocation()).stream()
                .map(Order::getPrice)
                .reduce(0f, Float::sum);
    }

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("workTime", workTime.toString());
        stats.put("money", moneyEarned);
        return stats;
    }

}
