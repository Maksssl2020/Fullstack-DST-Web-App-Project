package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.favourite_item.FavouriteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteItemRepository extends JpaRepository<FavouriteItem, Long> {

    Long countByUserId(Long userId);
    List<FavouriteItem> findAllByUserId(Long userId);
}
