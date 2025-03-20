
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp,
  ClipboardList,
  Truck, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, label, path, isActive, onClick }: SidebarItemProps) => (
  <div 
    className={`flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer transition-colors ${
      isActive 
        ? 'bg-primary text-white' 
        : 'hover:bg-primary/10'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);
  
  const navItems = [
    { 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: "لوحة التحكم", 
      path: "/dashboard" 
    },
    { 
      icon: <ShoppingCart className="h-5 w-5" />, 
      label: "المبيعات", 
      path: "/sales" 
    },
    { 
      icon: <Package className="h-5 w-5" />, 
      label: "المنتجات", 
      path: "/products" 
    },
    { 
      icon: <ClipboardList className="h-5 w-5" />, 
      label: "المخزون", 
      path: "/inventory" 
    },
    { 
      icon: <Users className="h-5 w-5" />, 
      label: "العملاء", 
      path: "/customers" 
    },
    { 
      icon: <Truck className="h-5 w-5" />, 
      label: "الطلبات", 
      path: "/orders" 
    },
    { 
      icon: <TrendingUp className="h-5 w-5" />, 
      label: "التقارير", 
      path: "/reports" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: "الإعدادات", 
      path: "/settings" 
    },
  ];
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };
  
  const renderSidebar = () => (
    <div className="w-full h-full flex flex-col">
      <div className="px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <div>
            <h2 className="font-bold text-lg">نظام الصيدلية</h2>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 mt-auto">
        <Separator className="mb-4" />
        {user && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium text-primary">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{user.email}</p>
                <p className="text-xs text-muted-foreground">صيدلي</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 border-r shrink-0">
        {renderSidebar()}
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="right" className="p-0 w-64">
          {renderSidebar()}
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="border-b h-16 flex items-center px-4 justify-between md:justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            {/* يمكن إضافة عناصر قائمة أعلى الصفحة هنا */}
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
