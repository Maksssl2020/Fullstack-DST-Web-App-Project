import AnimatedPage from "../../animation/AnimatedPage.jsx";
import NewProductForm from "../../components/form/product/NewProductForm.jsx";

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
