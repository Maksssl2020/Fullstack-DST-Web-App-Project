package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    boolean existsByCartIdentifier(String cartIdentifier);
    Cart findByCartIdentifier(String cartIdentifier);

//    List<Cart> findBy();
}
