package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.statistic.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic, Long> {
}
