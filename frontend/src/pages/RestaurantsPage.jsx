import { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import RestaurantCard from "../components/ui/RestaurantCard";
import { fetchRestaurants } from "../services/restaurantService";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants()
      .then((res) => {
        // console.log(
        //   "Restaurant API Base URL:",
        //   import.meta.env.VITE_RESTAURANT_URL
        // );
        //console.log(res.data);
        setRestaurants(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Restaurants</h2>

        {loading && <p className="text-gray-500">Loading…</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r._id} r={r} />
          ))}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default RestaurantsPage;
