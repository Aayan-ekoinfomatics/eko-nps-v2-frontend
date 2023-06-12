// routing
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/global-components/ProtectedRoute";
import ProtectedFromValidUser from "./components/global-components/ProtectedFromValidUser";
// pages and components
import LoginPage from "./pages/LoginPage";
import NPSDashboard from "./pages/NPSDashboard";
import GoogleReviewsSentiments from "./pages/GoogleReviewsSentiments";
import GoogleReviewsDashboard from "./pages/GoogleReviewsDashboard";
import ReviewsTablePage from "./pages/ReviewsTablePage";
import NPSSentimentsTablePage from "./pages/NPSSentimentsTablePage";
import NPSCommentsTablePage from "./pages/NPSCommentsTablePage";
import ConsolidatedDashboard from "./pages/ConsolidatedDashboard";
import Sidebar from "./components/global-components/Sidebar";

function App() {
  // local variables
  const location = useLocation();

  return (
    <div className="font-poppins ">
      {/* conditional rendering of sidebar */}
      {location?.pathname?.includes("/login") ? null : <Sidebar />}
      {/* changing padding of main content according to the pathname */}
      <div
        className={`${
          location?.pathname?.includes("/login")
            ? ""
            : "sm:pl-[60px] lg:pl-[200px] 2xl:pl-[230px]"
        }`}
      >
        {/* all routes */}
        <Routes>
          {/* Routes hidden from authenticated user and only route visible to public */}
          <Route element={<ProtectedFromValidUser />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          {/* Routes hidden from non authenticated user / public*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ConsolidatedDashboard />} />
            <Route
              path="/google-dashboard"
              element={<GoogleReviewsDashboard />}
            />
            <Route
              path="/google-dashboard/sentiments"
              element={<GoogleReviewsSentiments />}
            />
            <Route
              path="/google-dashboard/comments"
              element={<ReviewsTablePage />}
            />
            <Route path="/nps-dashboard" element={<NPSDashboard />} />
            <Route
              path="/nps-dashboard/sentiments"
              element={<NPSSentimentsTablePage />}
            />
            <Route
              path="/nps-dashboard/comments"
              element={<NPSCommentsTablePage />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
