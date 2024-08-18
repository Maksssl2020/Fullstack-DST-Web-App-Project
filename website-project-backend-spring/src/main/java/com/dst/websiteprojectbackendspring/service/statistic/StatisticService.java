package com.dst.websiteprojectbackendspring.service.statistic;

import com.dst.websiteprojectbackendspring.model.statistic.Statistic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StatisticService {

    void saveStatistic(Statistic statistic);
    List<Statistic> getStatistics();
    void updateStatistic(Long statisticId, Statistic statistic);
    void deleteStatistic(Long statisticId);
}
