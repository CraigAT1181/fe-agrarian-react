import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdCarousel from "./components/AdCarousel";
import ErrorHandling from "./components/ErrorHandling";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

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
const ActivityDetail = lazy(() => import("./components/ActivityDetail"));
const BlogPage = lazy(() => import("./components/BlogPage"));
const Blog = lazy(() => import("./components/Blog"));
const Shop = lazy(() => import("./components/Shop"));

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Header />
        <main className="main">
          <Suspense
            fallback={
              <div className="flex justify-center">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </div>
            }>
            <Routes>
              <Route
                path="/"
                element={<Exchange />}
              />
              <Route
                path="/exchange"
                element={<Exchange />}
              />
              <Route
                path="/home"
                element={<Home />}
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
                path="/activities/:activity_id"
                element={<ActivityDetail />}
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
