package com.dst.websiteprojectbackendspring.service.favourite_item;

import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemDTO;
import com.dst.websiteprojectbackendspring.dto.favourite_item.FavouriteItemRequest;
import com.dst.websiteprojectbackendspring.mapper.FavouriteItemDTOMapper;
import com.dst.websiteprojectbackendspring.model.favourite_item.FavouriteItem;
import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_item.ProductItem;
import com.dst.websiteprojectbackendspring.model.product_size.Size;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.FavouriteItemRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavouriteItemServiceImpl implements FavouriteItemService {

    private final FavouriteItemRepository favouriteItemRepository;
    private final FavouriteItemDTOMapper favouriteItemDTOMapper;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public void saveFavouriteItem(FavouriteItemRequest favouriteItemRequest) throws NotFoundException {
        Optional<Product> foundProduct = productRepository.findById(favouriteItemRequest.mainProductId());
        Optional<User> foundUser = userRepository.findById(favouriteItemRequest.userId());

        if (foundProduct.isEmpty()) {
            throw new NotFoundException("Product not found!");
        }
        if (foundUser.isEmpty()) {
            throw new NotFoundException("User not found!");
        }

        Product product = foundProduct.get();
        FavouriteItem.FavouriteItemBuilder<?, ?> favouriteItemBuilder = FavouriteItem
                .builder()
                .user(foundUser.get())
                .mainImage(product.getImages().getFirst().getImageData())
                .productFullTitle(product.getTitle())
                .mainProductId(favouriteItemRequest.mainProductId())
                .unitPrice(product.getPrice());

        if (favouriteItemRequest.size() != null) {
            favouriteItemBuilder.productSize(Size.valueOf(favouriteItemRequest.size().toUpperCase()));
        }

        favouriteItemRepository.save(favouriteItemBuilder.build());
    }

    @Override
    public List<FavouriteItemDTO> findAllFavouriteItems() {
        return favouriteItemRepository.findAll().stream()
                .map(favouriteItemDTOMapper::mapFavouriteItemToFavouriteItemDTO)
                .toList();
    }

    @Override
    public List<FavouriteItemDTO> findAllUserFavouriteItems(Long userId) {
        return favouriteItemRepository.findAllByUserId(userId).stream()
                .map(favouriteItemDTOMapper::mapFavouriteItemToFavouriteItemDTO)
                .toList();
    }

    @Override
    public List<Long> findAllUserProductsMarkedAsFavourite(Long userId) {
        return favouriteItemRepository.findAllByUserId(userId).stream()
                .map(ProductItem::getId)
                .toList();
    }

    @Override
    public void deleteFavouriteItem(Long favouriteItemId) {
        favouriteItemRepository.deleteById(favouriteItemId);
    }
}
