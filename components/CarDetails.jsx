import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cars/${id}`);
        if (!response.ok) {
          throw new Error("Car not found");
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading car details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back to Results
        </button>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="not-found">
        <p>Car details not available</p>
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back to Results
        </button>
      </div>
    );
  }

  return (
    <div className="car-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back to Results
      </button>

      <div className="car-details-content">
        <div className="car-image-container">
          <img
            src={car.image || "/default-car-image.jpg"}
            alt={car.name}
            className="car-detail-image"
            onError={(e) => {
              e.target.src = "/default-car-image.jpg";
            }}
          />
        </div>

        <div className="car-info-container">
          <h1>{car.name}</h1>
          <h2>{car.brand}</h2>

          <div className="price-section">
            <span className="price">
              ₹{car.price?.toLocaleString() || "Price not available"}
            </span>
          </div>

          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Fuel Type</span>
              <span className="spec-value">{car.fuel || "N/A"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Seating</span>
              <span className="spec-value">{car.seating || "N/A"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Engine</span>
              <span className="spec-value">{car.engine || "N/A"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Transmission</span>
              <span className="spec-value">{car.transmission || "N/A"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Mileage</span>
              <span className="spec-value">{car.mileage || "N/A"}</span>
            </div>
          </div>

          <button className="test-drive-button">Book a Test Drive</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
