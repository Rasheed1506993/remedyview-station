
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Pill } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Register form state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Error states
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (!email || !password) {
      setLoginError("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError("حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    if (!regEmail || !regPassword || !regConfirmPassword || !firstName || !lastName) {
      setRegisterError("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }
    
    if (regPassword !== regConfirmPassword) {
      setRegisterError("كلمات المرور غير متطابقة");
      return;
    }
    
    try {
      await signUp(regEmail, regPassword, firstName, lastName, phone);
      setActiveTab("login");
    } catch (error) {
      console.error('Register error:', error);
      setRegisterError("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-pharmacy-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-2">
            <Pill className="h-10 w-10 text-pharmacy-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            نظام إدارة الصيدليات
          </h1>
          <p className="mt-2 text-gray-600">
            منصة متكاملة لإدارة الصيدليات وتنظيم المبيعات والمخزون
          </p>
        </div>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">مرحباً بك مجدداً</CardTitle>
                <CardDescription className="text-center">
                  أدخل بيانات الدخول للوصول إلى حسابك
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="example@domain.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Button variant="link" className="px-0 text-xs" type="button">
                        نسيت كلمة المرور؟
                      </Button>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {loginError && (
                    <p className="text-destructive text-sm">{loginError}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "جاري التحميل..." : "تسجيل الدخول"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">إنشاء حساب جديد</CardTitle>
                <CardDescription className="text-center">
                  أدخل بياناتك لإنشاء حساب جديد
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input 
                        id="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      <Input 
                        id="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regEmail">البريد الإلكتروني</Label>
                    <Input 
                      id="regEmail" 
                      type="email" 
                      placeholder="example@domain.com" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regPassword">كلمة المرور</Label>
                    <Input 
                      id="regPassword" 
                      type="password" 
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {registerError && (
                    <p className="text-destructive text-sm">{registerError}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "جاري التحميل..." : "إنشاء الحساب"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
