
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, User, MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Dummy cart items for demonstration
const dummyCartItems = [
  {
    id: 'amoxicillin-500mg',
    name: {
      en: 'Amoxicillin 500mg',
      ar: 'أموكسيسيلين 500 مج'
    },
    price: 15.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'ibuprofen-200mg',
    name: {
      en: 'Ibuprofen 200mg',
      ar: 'إيبوبروفين 200 مج'
    },
    price: 8.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1626716493697-dfb3c8c34135?q=80&w=100&auto=format&fit=crop'
  }
];

const Checkout: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [cartItems] = useState(dummyCartItems);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and will be processed shortly.",
      });
      
      setIsSubmitting(false);
      // In a real app, you would redirect to a confirmation page or clear the cart
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/products">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Shopping
              </Link>
            </Button>
            <h1 className="heading-2 text-gray-900">{t('checkout.title')}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 lg:order-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-xl mb-4">{t('checkout.summary')}</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name[language]}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-900">{item.name[language]}</h3>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('checkout.subtotal')}</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('checkout.shipping')}</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('checkout.tax')}</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-semibold">{t('checkout.total')}</span>
                      <span className="font-bold text-pharmacy-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
                      <Truck className="h-5 w-5" />
                      <span className="text-sm font-medium">Free shipping on orders over $50!</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Checkout Form */}
            <div className="lg:col-span-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <MapPin className="h-5 w-5 text-pharmacy-600" />
                      <h2 className="font-semibold text-xl">{t('checkout.address')}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" required />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input id="state" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input id="zip" required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Method */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="h-5 w-5 text-pharmacy-600" />
                      <h2 className="font-semibold text-xl">{t('checkout.payment')}</h2>
                    </div>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-3">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="h-5 w-5" />
                          <span>{t('checkout.card')}</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">
                          {t('checkout.paypal')}
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === 'credit-card' && (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 text-sm text-gray-600 flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Button
                  type="submit"
                  className="w-full p-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : t('checkout.place')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
