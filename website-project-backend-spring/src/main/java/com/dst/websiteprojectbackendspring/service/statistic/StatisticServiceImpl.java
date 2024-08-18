package com.dst.websiteprojectbackendspring.service.statistic;

import com.dst.websiteprojectbackendspring.model.statistic.Statistic;
import com.dst.websiteprojectbackendspring.repository.StatisticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    private final StatisticRepository statisticRepository;

    @Override
    public void saveStatistic(Statistic statistic) {
        statisticRepository.save(statistic);
    }

    @Override
    public List<Statistic> getStatistics() {
        return statisticRepository.findAll();
    }

    @Override
    public void updateStatistic(Long statisticId, Statistic statistic) {
        try {
            Statistic foundStatistic = statisticRepository.findById(statisticId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundStatistic.setName(statistic.getName());
            foundStatistic.setValue(statistic.getValue());
            foundStatistic.setFieldHexColor(statistic.getFieldHexColor());
            statisticRepository.save(foundStatistic);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteStatistic(Long statisticId) {
        statisticRepository.deleteById(statisticId);
    }
}
