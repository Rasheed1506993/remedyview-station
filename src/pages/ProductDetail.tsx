
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { ChevronLeft, ShoppingCart, ShieldCheck, Pill, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [product, setProduct] = useState(products.find(p => p.slug === slug));
  const [category, setCategory] = useState(product ? categories.find(c => c.id === product.categoryId) : undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Update product when slug changes
    setProduct(products.find(p => p.slug === slug));
  }, [slug]);

  useEffect(() => {
    // Update category when product changes
    if (product) {
      setCategory(categories.find(c => c.id === product.categoryId));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="heading-2 text-gray-900 mb-4">Product Not Found</h1>
            <p className="paragraph mb-8">The product you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // For demo purposes, we'll use the main image and a couple of variants
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1603792907191-89e55f70099a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8 text-sm">
            <Link to="/" className="text-gray-500 hover:text-pharmacy-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-pharmacy-600">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{product.name[language]}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100 h-96">
                <img
                  src={productImages[activeImageIndex]}
                  alt={product.name[language]}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="flex space-x-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                      activeImageIndex === index ? 'border-pharmacy-500 shadow-sm' : 'border-gray-200'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name[language]} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {category && (
                <div className="text-sm font-medium text-pharmacy-600">
                  {category.name[language]}
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900">{product.name[language]}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-pharmacy-600">${product.price.toFixed(2)}</span>
                {product.requiresPrescription && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center">
                    <Pill className="h-3 w-3 mr-1" />
                    {t('product.requiresPrescription')}
                  </div>
                )}
              </div>

              <p className="text-gray-600">{product.description[language]}</p>

              {/* Quantity and Add to Cart */}
              {product.inStock ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">Quantity:</span>
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button
                        onClick={decrementQuantity}
                        className="px-3 py-1 border-r border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-1 border-l border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="flex-grow flex items-center justify-center btn-hover">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {t('product.addToCart')}
                    </Button>
                    {product.requiresPrescription && (
                      <Button variant="outline" asChild className="btn-hover">
                        <Link to="/prescription">
                          <Pill className="h-5 w-5 mr-2" />
                          Upload Prescription
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-100 rounded-md p-4 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-700">Out of Stock</h4>
                    <p className="text-sm text-red-600">This product is currently unavailable. Please check back later.</p>
                  </div>
                </div>
              )}

              {/* Safety and Shipping Info */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center text-gray-600 text-sm">
                  <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                  <span>Genuine Product Guaranteed</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Fast Shipping available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="description">{t('product.description')}</TabsTrigger>
                {product.dosage && <TabsTrigger value="dosage">{t('product.dosage')}</TabsTrigger>}
                {product.sideEffects && <TabsTrigger value="sideEffects">{t('product.sideEffects')}</TabsTrigger>}
                {product.ingredients && <TabsTrigger value="ingredients">{t('product.ingredients')}</TabsTrigger>}
              </TabsList>
              <TabsContent value="description" className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed">{product.description[language]}</p>
              </TabsContent>
              {product.dosage && (
                <TabsContent value="dosage" className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{product.dosage[language]}</p>
                </TabsContent>
              )}
              {product.sideEffects && (
                <TabsContent value="sideEffects" className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{product.sideEffects[language]}</p>
                </TabsContent>
              )}
              {product.ingredients && (
                <TabsContent value="ingredients" className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{product.ingredients[language]}</p>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
