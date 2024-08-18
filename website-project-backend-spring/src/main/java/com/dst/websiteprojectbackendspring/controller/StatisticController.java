package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.statistic.Statistic;
import com.dst.websiteprojectbackendspring.service.statistic.StatisticServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/statistics")
public class StatisticController {

    private final StatisticServiceImpl statisticService;

    @GetMapping
    public ResponseEntity<List<Statistic>> getStatistics() {
        return ResponseEntity.ok(statisticService.getStatistics());
    }

    @PostMapping("/add-statistic")
    public ResponseEntity<HttpStatus> addStatistic(@RequestBody Statistic statistic) {
        statisticService.saveStatistic(statistic);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{statisticId}/update-statistic")
    public ResponseEntity<HttpStatus> updateStatistic(@PathVariable Long statisticId, @RequestBody Statistic statistic) {
        statisticService.updateStatistic(statisticId, statistic);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{statisticId}/delete")
    public ResponseEntity<HttpStatus> deleteStatistic(@PathVariable Long statisticId) {
        statisticService.deleteStatistic(statisticId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
