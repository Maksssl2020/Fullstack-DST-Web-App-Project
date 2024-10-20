package com.dst.websiteprojectbackendspring.service.favourite_item;

import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemDTO;
import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemIdentifyDataDTO;
import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemRequest;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavouriteItemService {

    void saveFavouriteItem(FavouriteItemRequest favouriteItemRequest) throws NotFoundException;
    Long countUserFavouriteItems(Long userId);
    List<FavouriteItemDTO> findAllFavouriteItems();
    List<FavouriteItemDTO> findAllUserFavouriteItems(Long userId);
    List<FavouriteItemIdentifyDataDTO> findAllUserProductsMarkedAsFavourite(Long userId);
    void deleteFavouriteItem(Long itemId);
}
