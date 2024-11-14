import AnimatedPage from "../../animation/AnimatedPage.jsx";
import NewProductForm from "../../components/form/product/NewProductForm.jsx";
import React from "react";

type ProductFormProps = {
  isEditing?: boolean;
};

const ProductForm = ({ isEditing }: ProductFormProps) => {
  return (
    <AnimatedPage>
      <div className="flex h-auto w-full justify-center font-lato">
        <NewProductForm isEditing={isEditing} />
      </div>
    </AnimatedPage>
  );
};

export default ProductForm;
