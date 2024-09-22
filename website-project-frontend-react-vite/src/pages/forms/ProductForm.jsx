import AnimatedPage from "../../animation/AnimatedPage.jsx";
import NewProductForm from "../../components/form/product/NewProductForm.jsx";

const ProductForm = ({ isEditing }) => {
  return (
    <AnimatedPage>
      <div className="w-full font-lato h-auto flex justify-center">
        <NewProductForm isEditing={isEditing} />
      </div>
    </AnimatedPage>
  );
};

export default ProductForm;
