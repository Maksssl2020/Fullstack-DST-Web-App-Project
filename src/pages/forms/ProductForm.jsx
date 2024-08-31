import React from "react";
import AnimatedPage from "../../animation/AnimatedPage";
import NewProductForm from "../../components/form/product/NewProductForm";

const ProductForm = () => {
  return (
    <AnimatedPage>
      <div className="w-full font-lato h-auto flex justify-center">
        <NewProductForm />
      </div>
    </AnimatedPage>
  );
};

export default ProductForm;
