// src/pages/CartsPage.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { fetchCartsByUser, fetchCartItems } from "../services/cartService";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/spinner";
import { Empty } from "../components/ui/empty";
import { fetchRestaurant } from "../services/restaurantService";

export default function CartsPage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    fetchCartsByUser(user._id)
      .then((carts) =>
        Promise.all(
          carts.map(async (cart) => {
            const items = await fetchCartItems(cart._id);
            const restaurant = (await fetchRestaurant(cart.restaurantId)).data;
            return { ...cart, itemCount: items.length, restaurant };
          })
        )
      )
      .then(setCarts)
      .catch(console.error);
  }, [user, navigate, loading]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-semibold">Your Carts</h2>

      {carts.length === 0 ? (
        <Empty>
          <Empty.Header>
            <Empty.Title>No Carts Found</Empty.Title>
            <Empty.Description>
              Looks like you haven’t added anything to a cart yet.
            </Empty.Description>
          </Empty.Header>
          <Empty.Footer>
            <Button asChild variant="outline" size="lg">
              <Link to="/restaurants">Browse Restaurants</Link>
            </Button>
          </Empty.Footer>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {carts.map((cart) => (
            <Card key={cart._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  Restaurant: {cart.restaurant.name}
                </CardTitle>
                <img src={cart.restaurant.image}></img>
              </CardHeader>
              <CardContent>
                You have <strong>{cart.itemCount}</strong>{" "}
                {cart.itemCount === 1 ? "item" : "items"} in this cart.
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="primary"
                  className="bg-blue-600 text-white"
                  size="sm"
                >
                  <Link to={`/carts/${cart._id}`}>View Cart</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
