import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<RestaurantsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
