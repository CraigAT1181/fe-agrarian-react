import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { NotificationProvider } from "./components/contexts/NotificationContext";
import { MessagingProvider } from "./components/contexts/MessagingContext";
import { PostProvider } from "./components/contexts/PostContext";
import { AdProvider } from "./components/contexts/AdContext";
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
const PasswordResetRequest = lazy(() =>
  import("./components/PasswordResetRequest")
);
const SetNewPassword = lazy(() => import("./components/SetNewPassword"));

export default function App() {
  return (
    <div className="wrapper">
      <AuthProvider>
        <NotificationProvider>
          <MessagingProvider>
            <PostProvider>
              <AdProvider>
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
                      <Route path="/" element={<Welcome />} />
                      <Route path="/allotments/:site" element={<Allotment />} />
                      <Route path="/towns/:town" element={<Town />} />
                      <Route path="/posts/:postId" element={<PostThread />} />
                      <Route path="/ads" element={<Ads />} />

                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/bookmarks" element={<Bookmarks />} />
                      <Route path="/inbox" element={<Inbox />} />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/*" element={<ErrorHandling />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/password-reset-request"
                        element={<PasswordResetRequest />}
                      />
                      <Route
                        path="/set-new-password"
                        element={<SetNewPassword />}
                      />
                    </Routes>
                  </Suspense>
                </main>
                {/* <Footer /> */}
              </AdProvider>
            </PostProvider>
          </MessagingProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}
