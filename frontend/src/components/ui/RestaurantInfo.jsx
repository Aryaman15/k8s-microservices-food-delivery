import React from "react";

const RestaurantInfo = ({ data }) => {
  if (!data) return null;

  return (
    <aside className="bg-gray-50 rounded-xl shadow p-6 space-y-4 w-full h-fit">
      <h3 className="font-semibold text-lg">Restaurant Information</h3>

      {/* Address */}
      {data.address && (
        <div>
          <p className="text-sm text-gray-500">Address:</p>
          <p className="text-sm">{data.address}</p>
        </div>
      )}

      {/* Operating Hours */}
      {data.operatingHours && (
        <div>
          <p className="text-sm text-gray-500">Hours of Operation:</p>
          <p className="text-sm">
            {data.operatingHours.open} – {data.operatingHours.close}
          </p>
        </div>
      )}

      {/* Map placeholder (you can replace with actual embed later) */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Location:</p>
        <p>{data.address}</p>
        <img
          src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api_480.png"
          alt="map"
          className="w-full h-40 object-cover rounded-xl"
        />
      </div>
    </aside>
  );
};

export default RestaurantInfo;
