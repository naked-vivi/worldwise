import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/home-page.tsx";
import Pricing from "./pages/pricing.tsx";
import Product from "./pages/product.tsx";
import PageNotFound from "./pages/page-not-found.tsx";
import AppLayout from "./pages/app-layout.tsx";
import Login from "./pages/login.tsx";
import CityList from "./components/city-list.tsx";

import CountryList from "./components/country-list.tsx";
import City from "./components/city.tsx";

function App() {
  const BASE_URL = "http://localhost:3001"

  const [cities, setCities] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      }
      catch {
        alert("Error fetching cities data")
      }
      finally {
        setLoading(false)
      }
    }
    fetchCities()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} /> // root url
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} /> // catch all route that not exist
      </Routes>
    </BrowserRouter>
  );
}

export default App
