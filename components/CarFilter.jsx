import React from "react";
import "./CarFilter.css";

const CarFilter = ({
  inputText,
  setInputText,
  brand,
  setBrand,
  fuelType,
  setFuelType,
  min,
  setMin,
  max,
  setMax,
  seating,
  setSeating,
}) => {
  const minGap = 50000;
  const sliderMax = 2000000;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value + minGap <= max) setMin(value);
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value - minGap >= min) setMax(value);
  };

  return (
    <>
      <div className="top-container">
        <h1 className="head">Browse Cars That Match Your Style</h1>
        <p className="tagline">
          Use filters to narrow down your perfect ride — brand, price, fuel
          type, and more
        </p>
        <img className="image" src="/Group@3x.png" alt="banner" />
      </div>
      <div className="car-filter-wrapper-horizontal">
        <input
          className="searchbar"
          type="text"
          value={inputText}
          placeholder="Search cars..."
          onChange={(e) => setInputText(e.target.value)}
        />
        <hr />

        <label className="titles">Brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="brand"
        >
          <option value="brand" disabled>
            Brand
          </option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Tata">Tata</option>
          <option value="Hyundai">Hyundai</option>
        </select>
        <hr />

        <label className="titles">Price Range</label>
        <div className="price-range-inline">
          <div className="price-display">
            <span>
              ₹{formatCurrency(min)} - ₹{formatCurrency(max)}
            </span>
          </div>
          <div className="slider-container">
            <div className="slider-track"></div>
            <input
              type="range"
              min="0"
              max={sliderMax}
              value={min}
              onChange={handleMinChange}
              className="slider min-slider"
            />
            <input
              type="range"
              min="0"
              max={sliderMax}
              value={max}
              onChange={handleMaxChange}
              className="slider max-slider"
            />
          </div>
        </div>
        <hr />

        <div className="radio-inline">
          <label className="titles">Fuel Type</label>
          {["Petrol", "Diesel", "Electric"].map((type) => (
            <label className="custom-radio" key={type}>
              <input
                type="radio"
                name="fuelType"
                value={type}
                checked={fuelType === type}
                onChange={(e) => setFuelType(e.target.value)}
              />
              <span className="checkmark">✔</span>
              <span className="radio-text">{type}</span>
            </label>
          ))}
        </div>
        <hr />

        <label className="titles">Seating Capacity</label>
        <div className="radio-inline custom-radio-group">
          {["4", "5", "6", "7"].map((seat) => (
            <label className="custom-radio" key={seat}>
              <input
                type="radio"
                name="seating"
                value={seat}
                checked={seating === seat}
                onChange={(e) => setSeating(e.target.value)}
              />
              <span className="checkmark">✔</span>
              <span className="radio-text">{seat}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarFilter;
