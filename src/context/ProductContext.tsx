import React, { createContext, useContext, useState } from 'react';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { SampleProduct } from '../types/inspection';

interface ProductContextType {
  products: SampleProduct[];
  selectedProduct: SampleProduct;
  selectProduct: (id: string) => void;
  updateProductSurface: (productId: string, surfaceKey: 'front' | 'back' | 'side' | 'topBottom', src: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<SampleProduct[]>(SAMPLE_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(SAMPLE_PRODUCTS[0].id);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const selectProduct = (id: string) => {
    const exists = products.some((p) => p.id === id);
    if (exists) {
      setSelectedProductId(id);
    }
  };

  const updateProductSurface = (productId: string, surfaceKey: 'front' | 'back' | 'side' | 'topBottom', src: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        return {
          ...p,
          surfaces: {
            ...p.surfaces,
            [surfaceKey]: src
          }
        };
      })
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        selectProduct,
        updateProductSurface
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
