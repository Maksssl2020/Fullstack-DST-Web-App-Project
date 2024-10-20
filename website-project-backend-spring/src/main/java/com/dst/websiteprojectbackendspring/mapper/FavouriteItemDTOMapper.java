package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemDTO;
import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemIdentifyDataDTO;
import com.dst.websiteprojectbackendspring.model.favourite_item.FavouriteItem;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FavouriteItemDTOMapper {

    private final ModelMapper modelMapper;

    public FavouriteItemDTO mapFavouriteItemToFavouriteItemDTO(FavouriteItem favouriteItem) {
        return modelMapper.map(favouriteItem, FavouriteItemDTO.class);
    }

    public FavouriteItemIdentifyDataDTO mapFavouriteItemToFavouriteItemIdentifyDataDTO(FavouriteItem favouriteItem) {
        return modelMapper.map(favouriteItem, FavouriteItemIdentifyDataDTO.class);
    }
}
