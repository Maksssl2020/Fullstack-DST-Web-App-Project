package com.dst.websiteprojectbackendspring.service.favourite_item;

import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemDTO;
import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemRequest;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavouriteItemService {

    void saveFavouriteItem(FavouriteItemRequest favouriteItemRequest) throws NotFoundException;
    List<FavouriteItemDTO> findAllFavouriteItems();
    List<FavouriteItemDTO> findAllUserFavouriteItems(Long userId);
    List<Long> findAllUserProductsMarkedAsFavourite(Long userId);
    void deleteFavouriteItem(Long favouriteItemId);
}
