import React, { useState, useEffect } from "react";
import "./CarList.css";
import { useNavigate } from "react-router-dom";

const CarList = ({ cars }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (car) => {
    const exists = wishlist.find((item) => item.id === car.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== car.id));
    } else {
      setWishlist([...wishlist, car]);
    }
  };
  const handleDetails = (car) => {
    navigate(`/car/${car.id}`);
  };
  const handleViewDetails = (car) => {
    navigate(`/car/${car.id}`);
    // You can implement your view details logic here
    console.log("Viewing details for:", car);
    // For example: navigate to a details page or show a modal
  };

  if (!cars.length) {
    return <p style={{ padding: "1rem" }}>No cars match your criteria.</p>;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <img src={car.image} alt={car.name} className="car-img" />
          <h3>{car.name}</h3>
          <p>Brand: {car.brand}</p>
          <p>Fuel: {car.fuel}</p>
          <p>Seating: {car.seating}</p>
          <p>Price: ₹{car.price.toLocaleString()}</p>
          <div className="button-group">
            <button
              onClick={() => toggleWishlist(car)}
              className="wishlist-btn"
            >
              {wishlist.find((item) => item.id === car.id)
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>
            <button
              onClick={() => handleViewDetails(car)}
              className="details-btn"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
