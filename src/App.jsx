import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { PostProvider } from "./components/contexts/PostContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

const Welcome = lazy(() => import("./components/utilities/Welcome"));
const ErrorHandling = lazy(() => import("./components/ErrorHandling"));
const Allotment = lazy(() => import("./components/Allotment"));
const Town = lazy(() => import("./components/Town"));
const PostThread = lazy(() => import("./components/posts/PostThread"));
const Ads = lazy(() => import("./components/ads/Ads"));
const Blogs = lazy(() => import("./components/blogs/Blogs"));
const Bookmarks = lazy(() => import("./components/bookmarks/Bookmarks"));
const Inbox = lazy(() => import("./components/inbox/Inbox"));
const Notifications = lazy(() =>
  import("./components/notifications/Notifications")
);
const Settings = lazy(() => import("./components/settings/Settings"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

export default function App() {
  return (
    <div className="wrapper">
      <AuthProvider>
        <PostProvider>
          <Header />
          <main className="main">
            <Suspense
            // fallback={
            //   <div className="flex justify-center">
            //     <i className="fa-solid fa-spinner fa-spin"></i>
            //   </div>
            // }
            >
              <Routes>
                <Route
                  path="/"
                  element={<Welcome />}
                />
                <Route
                  path="/allotments/:site"
                  element={<Allotment />}
                />
                <Route
                  path="/towns/:town"
                  element={<Town />}
                />
                <Route
                  path="/posts/:postId"
                  element={<PostThread />}
                />
                <Route
                  path="/ads"
                  element={<Ads />}
                />
                <Route
                  path="/blogs"
                  element={<Blogs />}
                />
                <Route
                  path="/bookmarks"
                  element={<Bookmarks />}
                />
                <Route
                  path="/inbox"
                  element={<Inbox />}
                />
                <Route
                  path="/notifications"
                  element={<Notifications />}
                />
                <Route
                  path="/settings"
                  element={<Settings />}
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
              </Routes>
            </Suspense>
          </main>
          {/* <Footer /> */}
        </PostProvider>
      </AuthProvider>
    </div>
  );
}
