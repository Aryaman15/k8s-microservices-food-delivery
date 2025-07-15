import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantPage from "./pages/RestaurantPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartsPage from "./pages/CartsPage";
import CartDetailsPage from "./pages/CartDetailsPage";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* public */}
        <Route path="/" element={<RestaurantsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected cart area */}
        <Route element={<ProtectedRoute />}>
          <Route path="/carts" element={<CartsPage />} />
          <Route path="/carts/:id" element={<CartDetailsPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
