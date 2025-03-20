
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ShoppingCart, Pill } from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Products: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description[language].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.categoryId === selectedCategory);
    }

    // Sort products
    switch (sortOrder) {
      case 'name-asc':
        result.sort((a, b) => a.name[language].localeCompare(b.name[language]));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name[language].localeCompare(a.name[language]));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortOrder, language]);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="heading-2 text-gray-900 mb-8">{t('products.title')}</h1>

          {/* Search and Filter Controls */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={t('products.search')}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={toggleFilters}
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t('products.filter')}
                </Button>
                <Select
                  value={sortOrder}
                  onValueChange={setSortOrder}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('products.sort')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isFiltersVisible && (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mt-2 animate-fade-in">
                <h3 className="font-medium text-gray-900 mb-3">{t('products.category')}</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="rounded-full"
                  >
                    All
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="rounded-full"
                    >
                      {category.name[language]}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <SlidersHorizontal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="card-hover overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name[language]}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />
                    {product.requiresPrescription && (
                      <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium flex items-center">
                        <Pill className="h-3 w-3 mr-1" />
                        Rx
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{product.name[language]}</h3>
                        <p className="text-pharmacy-600 font-bold">${product.price.toFixed(2)}</p>
                      </div>
                      {product.inStock ? (
                        <Button variant="ghost" size="icon" aria-label="Add to cart">
                          <ShoppingCart className="h-5 w-5" />
                        </Button>
                      ) : (
                        <span className="text-sm text-red-500 font-medium">{t('products.outOfStock')}</span>
                      )}
                    </div>
                    <Link 
                      to={`/products/${product.slug}`} 
                      className="mt-3 text-sm text-pharmacy-600 hover:text-pharmacy-700 font-medium inline-block"
                    >
                      {t('products.viewDetails')}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
