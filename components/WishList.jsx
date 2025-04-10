import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WishList.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const removeFromWishlist = (carId) => {
    const updatedWishlist = wishlist.filter((car) => car.id !== carId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const viewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((car) => (
            <div key={car.id} className="wishlist-card">
              <img
                src={car.image}
                alt={car.name}
                className="wishlist-image"
                onClick={() => viewDetails(car.id)}
              />
              <div className="wishlist-details">
                <h3>{car.name}</h3>
                <p>Brand: {car.brand}</p>
                <p>Price: ₹{car.price.toLocaleString()}</p>
                <div className="wishlist-buttons">
                  <button
                    className="view-details-btn"
                    onClick={() => viewDetails(car.id)}
                  >
                    View Details
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(car.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
