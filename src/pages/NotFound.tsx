
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileSearch, Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="bg-pharmacy-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileSearch className="h-10 w-10 text-pharmacy-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
          <p className="text-gray-500 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild size="lg">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
