import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdCarousel from "./components/AdCarousel";
import ErrorHandling from "./components/ErrorHandling";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = lazy(() => import("./components/Home"));
const Exchange = lazy(() => import("./components/Exchange"));
const Messenger = lazy(() => import("./components/Messenger"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Posts = lazy(() => import("./components/Posts"));
const Calendar = lazy(() => import("./components/Calendar"));
const RequestLink = lazy(() => import("./components/RequestLink"));
const SetNewPassword = lazy(() => import("./components/SetNewPassword"));
const About = lazy(() => import("./components/About"));
const OfferSupport = lazy(() => import("./components/OfferSupport"));
const Privacy = lazy(() => import("./components/Privacy"));
const Cookies = lazy(() => import("./components/Cookies"));
const Contact = lazy(() => import("./components/Contact"));
const Development = lazy(() => import("./components/Development"));
const Activities = lazy(() => import("./components/Activities"));
const BlogPage = lazy(() => import("./components/BlogPage"));
const Blog = lazy(() => import("./components/Blog"));
const Shop = lazy(() => import("./components/Shop"));

export default function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AuthProvider>
        <Header />
        <main style={{ flex: 1, alignContent: "center" }}>
          <Suspense
            fallback={
              <div className="d-flex-col text-center mt-4">
                <i className="fa-solid fa-spinner fa-spin"></i>
                <p>Loading...</p>
              </div>
            }>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/home"
                element={<Home />}
              />
              <Route
                path="/exchange"
                element={<Exchange />}
              />
              <Route
                path="/messenger"
                element={<Messenger />}
              />
              <Route
                path="/posts"
                element={<Posts />}
              />
              <Route
                path="/calendar"
                element={<Calendar />}
              />
              <Route
                path="/*"
                element={<ErrorHandling />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route
                path="/request-link"
                element={<RequestLink />}
              />
              <Route
                path="/set-new-password"
                element={<SetNewPassword />}
              />
              <Route
                path="/about"
                element={<About />}
              />
              <Route
                path="/offer-support"
                element={<OfferSupport />}
              />
              <Route
                path="/privacy"
                element={<Privacy />}
              />
              <Route
                path="/cookies"
                element={<Cookies />}
              />
              <Route
                path="/contact"
                element={<Contact />}
              />
              <Route
                path="/development"
                element={<Development />}
              />
              <Route
                path="/activities"
                element={<Activities />}
              />
              <Route
                path="/blogs"
                element={<BlogPage />}
              />
              <Route
                path="/blogs/:blog_id"
                element={<Blog />}
              />
              <Route
                path="/shop"
                element={<Shop />}
              />
            </Routes>
          </Suspense>
        </main>
        <AdCarousel />
        <Footer />
      </AuthProvider>
    </div>
  );
}
