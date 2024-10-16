package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCartId(Long cartId);
    Long countByCartId(Long cartId);
    void deleteAllByCartId(Long cartId);
    List<CartItem> getAllByMainProductId(Long productId);
}
