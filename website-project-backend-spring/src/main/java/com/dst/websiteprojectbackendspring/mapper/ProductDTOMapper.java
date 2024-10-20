package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import com.dst.websiteprojectbackendspring.dto.product.clothing.ClothingDTO;
import com.dst.websiteprojectbackendspring.dto.product.gadget.GadgetDTO;
import com.dst.websiteprojectbackendspring.dto.product.mug.MugDTO;
import com.dst.websiteprojectbackendspring.dto.product.pen.PenDTO;
import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product.clothing.Clothing;
import com.dst.websiteprojectbackendspring.model.product.gadget.Gadget;
import com.dst.websiteprojectbackendspring.model.product.mug.Mug;
import com.dst.websiteprojectbackendspring.model.product.pen.Pen;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductDTOMapper {

    private final ModelMapper modelMapper;

    public ProductDTO mapProductToProductDTO(Product product) {
        return switch (product) {
            case Clothing clothing -> modelMapper.map(product, ClothingDTO.class);
            case Gadget gadget -> modelMapper.map(product, GadgetDTO.class);
            case Mug mug -> modelMapper.map(product, MugDTO.class);
            case Pen pen -> modelMapper.map(product, PenDTO.class);
            default -> modelMapper.map(product, ProductDTO.class);
        };
    }

    public ProductDTOForCard mapProductToProductDTOForCard(Product product) {
        return modelMapper.map(product, ProductDTOForCard.class);
    }
}
