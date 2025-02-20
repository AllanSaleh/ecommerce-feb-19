import { useEffect } from 'react';
import { Product } from '../../types/types';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';
import { useProductContext } from '../../context/ProductContext';
import { fetchProducts, fetchCategories } from '../../api/api';
import { useQuery } from 'react-query';

const Home = () => {
  const { products, selectedCategory, dispatch } = useProductContext();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (productsData) {
      dispatch({ type: 'SET_PRODUCTS', payload: productsData.data });
    }
  }, [dispatch, productsData]);

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products?.filter(
        (product: Product) => product.category === selectedCategory
      );
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div>
      <select
        onChange={(e) =>
          dispatch({ type: 'SET_SELECTED_CATEGORY', payload: e.target.value })
        }
      >
        <option value=''>All Categories</option>
        {categoriesData?.data.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <div className='container'>
        {isLoading && <h1>Loading...</h1>}
        {filteredProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default Home;
