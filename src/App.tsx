import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page.tsx";
import Pricing from "./pages/pricing.tsx";
import Product from "./pages/product.tsx";
import PageNotFound from "./pages/page-not-found.tsx";
import AppLayout from "./pages/app-layout.tsx";
import Login from "./pages/login.tsx";
import CityList from "./components/city-list.tsx";
import Form from "./components/form.tsx";
import CountryList from "./components/country-list.tsx";
import City from "./components/city.tsx";
import { CitiesProvider } from "./context/cities-provider.tsx";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} /> // root url
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} /> // catch all route that not exist
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App
