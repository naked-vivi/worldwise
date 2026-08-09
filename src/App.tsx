import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/city.tsx";
import { CitiesProvider } from "./context/cities-provider.tsx";
import AuthProvider from "./context/fake-auth-provider.tsx";
import ProtectedRoute from "./pages/protected-route.tsx";
import CityList from "./components/city-list.tsx";
import Form from "./components/form.tsx";
import CountryList from "./components/country-list.tsx";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/spinner-fullpage.tsx";

// import HomePage from "./pages/home-page.tsx";
// import Pricing from "./pages/pricing.tsx";
// import Product from "./pages/product.tsx";
// import PageNotFound from "./pages/page-not-found.tsx";
// import AppLayout from "./pages/app-layout.tsx";
// import Login from "./pages/login.tsx";

const HomePage = lazy(() => import("./pages/home-page.tsx"))
const Pricing = lazy(() => import("./pages/pricing.tsx"))
const Product = lazy(() => import("./pages/product.tsx"))
const PageNotFound = lazy(() => import("./pages/page-not-found.tsx"))
const AppLayout = lazy(() => import("./pages/app-layout.tsx"))
const Login = lazy(() => import("./pages/login.tsx"))

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} /> // root url
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />

              </Route>
              <Route path="*" element={<PageNotFound />} /> // catch all route that not exist
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App
