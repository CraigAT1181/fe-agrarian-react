import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorHandling from "./components/ErrorHandling";

const Home = lazy(() => import("./components/Home"));
const Exchange = lazy(() => import("./components/Exchange"));
const Messenger = lazy(() => import("./components/Messenger"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Posts = lazy(() => import("./components/Posts"));
const RequestLink = lazy(() => import("./components/RequestLink"));
const SetNewPassword = lazy(() => import("./components/SetNewPassword"));

export default function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AuthProvider>
        <Header />
        <main style={{ flex: 1, alignContent: "center" }}>
          <Suspense fallback={      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading...</p>
      </div>}>
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
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
}
