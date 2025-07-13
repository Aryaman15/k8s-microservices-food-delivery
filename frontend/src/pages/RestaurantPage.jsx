import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import MenuItemCard from "../components/ui/MenuItemCard";
import RestaurantInfo from "../components/ui/RestaurantInfo";
import { fetchRestaurant, fetchMenu } from "../services/restaurantService";

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch both restaurant and menu in parallel
    Promise.all([fetchRestaurant(id), fetchMenu(id)])
      .then(([rRes, mRes]) => {
        setRestaurant(rRes.data);
        setMenu(mRes.data?.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8 text-gray-500">Loading…</p>;
  if (!restaurant) return <p className="p-8 text-red-500">Not found.</p>;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">{restaurant.name}</h2>

        <section className="grid lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {menu.map((item, idx) => (
              <MenuItemCard key={idx} item={item} />
            ))}
            {menu.length === 0 && (
              <p className="text-gray-500 col-span-full">Menu not available.</p>
            )}
          </div>

          {/* Info panel */}
          <RestaurantInfo data={restaurant} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RestaurantPage;
