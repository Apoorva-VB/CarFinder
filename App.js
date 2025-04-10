import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarFilter from "./components/CarFilter";
import CarList from "./components/CarList";
import CarDetails from "./components/CarDetails";
import Wishlist from "./components/WishList";
import Header from "./components/Header";
import "./index.css";

const App = () => {
  const [cars, setCars] = useState([]);

  const [inputText, setInputText] = useState("");
  const [brand, setBrand] = useState("brand");
  const [fuelType, setFuelType] = useState("");
  const [min, setMin] = useState(500000);
  const [max, setMax] = useState(1000000);
  const [seating, setSeating] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  const [sortOrder, setSortOrder] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:4000/cars");
        const data = await res.json();
        console.log(data);
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [inputText, brand, fuelType, min, max, seating]);

  let filteredCars = cars.filter((car) => {
    const searchTerm = inputText.toLowerCase().trim();
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm) ||
      car.brand.toLowerCase().includes(searchTerm);
    const matchesBrand = brand === "brand" || car.brand === brand;
    const matchesFuel = fuelType === "" || car.fuel === fuelType;
    const matchesSeating = seating === "" || car.seating.toString() === seating;
    const matchesPrice = car.price >= min && car.price <= max;

    return (
      matchesSearch &&
      matchesBrand &&
      matchesFuel &&
      matchesSeating &&
      matchesPrice
    );
  });

  if (sortOrder === "low") {
    filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);
  }

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <Router>
      <div className="app-container">
        <Header />

        {isMobile && (
          <button
            className="open-filter-btn"
            onClick={() => setShowFilter(true)}
          >
            Filters
          </button>
        )}

        {isMobile && showFilter && (
          <div className="filter-overlay" onClick={() => setShowFilter(false)}>
            <div className="filter-popup" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setShowFilter(false)}
              >
                ✖
              </button>
              <CarFilter
                inputText={inputText}
                setInputText={setInputText}
                brand={brand}
                setBrand={setBrand}
                fuelType={fuelType}
                setFuelType={setFuelType}
                min={min}
                setMin={setMin}
                max={max}
                setMax={setMax}
                seating={seating}
                setSeating={setSeating}
              />
            </div>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                {!isMobile && (
                  <div className="filter-section">
                    <CarFilter
                      inputText={inputText}
                      setInputText={setInputText}
                      brand={brand}
                      setBrand={setBrand}
                      fuelType={fuelType}
                      setFuelType={setFuelType}
                      min={min}
                      setMin={setMin}
                      max={max}
                      setMax={setMax}
                      seating={seating}
                      setSeating={setSeating}
                    />
                  </div>
                )}

                <div className="main-content">
                  <div className="list-section">
                    <CarList cars={currentCars} />

                    {totalPages > 1 && (
                      <div className="pagination-container">
                        <div className="pagination">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i + 1}
                              className={`page-btn ${
                                currentPage === i + 1 ? "active" : ""
                              }`}
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            }
          />
          <Route path="/car/:id" element={<CarDetails cars={cars} />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
