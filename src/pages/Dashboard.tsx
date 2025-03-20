
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/layout/Layout';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  Truck, 
  AlertCircle, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string | number;
  linkTo: string;
  color: string;
}

const DashboardCard = ({ title, description, icon, value, linkTo, color }: DashboardCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
      onClick={() => navigate(linkTo)}>
      <CardHeader className={`p-4 ${color} text-white`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="p-2 bg-white bg-opacity-20 rounded-full">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-3xl font-bold mb-2">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStock: 0,
    expiringProducts: 0
  });
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchDashboardStats();
  }, [user, navigate]);
  
  const fetchDashboardStats = async () => {
    try {
      // هنا سنقوم بجلب البيانات الإحصائية من Supabase
      // هذه مجرد بيانات تجريبية للعرض
      
      // عدد المنتجات
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      
      // عدد العملاء
      const { count: customersCount } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true });
        
      // المنتجات منخفضة المخزون (للعرض فقط، سيتم تحسينها لاحقًا)
      const { count: lowStockCount } = await supabase
        .from('inventory')
        .select('*', { count: 'exact', head: true })
        .lt('quantity', 10);
      
      setStats({
        totalSales: 15420,
        totalProducts: productsCount || 0,
        totalCustomers: customersCount || 0,
        pendingOrders: 24,
        lowStock: lowStockCount || 0,
        expiringProducts: 8
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-muted-foreground">مرحباً بك في نظام إدارة الصيدليات</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard 
            title="المبيعات"
            description="إجمالي المبيعات اليومية"
            icon={<ShoppingCart className="h-6 w-6 text-white" />}
            value={`$${stats.totalSales}`}
            linkTo="/sales"
            color="bg-pharmacy-600"
          />
          
          <DashboardCard 
            title="المنتجات"
            description="إجمالي المنتجات في النظام"
            icon={<Package className="h-6 w-6 text-white" />}
            value={stats.totalProducts}
            linkTo="/products"
            color="bg-pharmacy-700"
          />
          
          <DashboardCard 
            title="العملاء"
            description="إجمالي قاعدة العملاء"
            icon={<Users className="h-6 w-6 text-white" />}
            value={stats.totalCustomers}
            linkTo="/customers"
            color="bg-pharmacy-800"
          />
          
          <DashboardCard 
            title="الطلبات المعلقة"
            description="طلبات بانتظار المعالجة"
            icon={<Truck className="h-6 w-6 text-white" />}
            value={stats.pendingOrders}
            linkTo="/orders"
            color="bg-yellow-600"
          />
          
          <DashboardCard 
            title="المخزون المنخفض"
            description="منتجات بحاجة إلى إعادة طلب"
            icon={<AlertCircle className="h-6 w-6 text-white" />}
            value={stats.lowStock}
            linkTo="/inventory/low-stock"
            color="bg-red-600"
          />
          
          <DashboardCard 
            title="تنتهي صلاحيتها قريباً"
            description="منتجات ستنتهي صلاحيتها خلال 30 يوم"
            icon={<AlertCircle className="h-6 w-6 text-white" />}
            value={stats.expiringProducts}
            linkTo="/inventory/expiring"
            color="bg-orange-600"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="col-span-full lg:col-span-1">
            <CardHeader>
              <CardTitle>تقرير المبيعات الأسبوعي</CardTitle>
              <CardDescription>آخر 7 أيام من النشاط</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20">
                <p className="text-muted-foreground">سيتم عرض الرسم البياني هنا</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-full lg:col-span-1">
            <CardHeader>
              <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
              <CardDescription>المنتجات الأعلى مبيعًا هذا الشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20">
                <p className="text-muted-foreground">سيتم عرض قائمة المنتجات هنا</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
