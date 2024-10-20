package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemDTO;
import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemIdentifyDataDTO;
import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemRequest;
import com.dst.websiteprojectbackendspring.service.favourite_item.FavouriteItemService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favourite-items")
@RequiredArgsConstructor
public class FavouriteItemController {

    private final FavouriteItemService favouriteItemService;

    @GetMapping
    public ResponseEntity<List<FavouriteItemDTO>> findAllFavouriteItems() {
        return ResponseEntity.ok(favouriteItemService.findAllFavouriteItems());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FavouriteItemDTO>> findAllUserFavouriteItems(@PathVariable Long userId) {
        return ResponseEntity.ok(favouriteItemService.findAllUserFavouriteItems(userId));
    }

    @GetMapping("/{userId}/find-all-marked-products-id")
    public ResponseEntity<List<FavouriteItemIdentifyDataDTO>> findAllMarkedProductsAsFavouriteItem(@PathVariable Long userId) {
        return ResponseEntity.ok(favouriteItemService.findAllUserProductsMarkedAsFavourite(userId));
    }

    @GetMapping("/{userId}/amountOfItems")
    public ResponseEntity<Long> getAmountOfUserFavouriteItems(@PathVariable Long userId) {
        return ResponseEntity.ok(favouriteItemService.countUserFavouriteItems(userId));
    }

    @PostMapping("/save")
    public ResponseEntity<HttpStatus> saveFavouriteItem(@RequestBody FavouriteItemRequest favouriteItemRequest) throws NotFoundException {
        favouriteItemService.saveFavouriteItem(favouriteItemRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{favouriteItemId}")
    public ResponseEntity<HttpStatus> deleteFavouriteItem(@PathVariable Long favouriteItemId) {
        favouriteItemService.deleteFavouriteItem(favouriteItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
