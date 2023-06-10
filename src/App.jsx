import LoginPage from "./pages/LoginPage";
import GoogleReviewsSentiments from "./pages/GoogleReviewsSentiments";
import GoogleReviewsDashboard from "./pages/GoogleReviewsDashboard";
import Sidebar from "./components/global-components/Sidebar";
import NSSCard from "./components/individual-components/NSSCard";
import { Route, Routes, useLocation } from "react-router-dom";
import ReviewsTablePage from "./pages/ReviewsTablePage";
import ProtectedRoute from "./components/global-components/ProtectedRoute";
import NPSDashboard from "./pages/NPSDashboard";
import NPSSentimentsTablePage from "./pages/NPSSentimentsTablePage";
import NPSCommentsTablePage from "./pages/NPSCommentsTablePage";
import ProtectedFromValidUser from "./components/global-components/ProtectedFromValidUser";
import ConsolidatedDashboard from "./pages/ConsolidatedDashboard";

function App() {
  // local variables
  const location = useLocation();

  return (
    <div className="font-poppins ">
      {location?.pathname?.includes("/login") ? null : <Sidebar />}
      <div
        className={`${
          location?.pathname?.includes("/login")
            ? ""
            : "sm:pl-[60px] lg:pl-[200px] 2xl:pl-[230px]"
        }`}
      >
        <Routes>
          <Route element={<ProtectedFromValidUser />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ConsolidatedDashboard />} />
            <Route
              path="/google-dashboard"
              element={<GoogleReviewsDashboard />}
            />
            <Route path="/sentiments" element={<GoogleReviewsSentiments />} />
            <Route path="/comments" element={<ReviewsTablePage />} />
            <Route path="/nps-dashboard" element={<NPSDashboard />} />
            <Route
              path="/nps-sentiments"
              element={<NPSSentimentsTablePage />}
            />
            <Route path="/nps-comments" element={<NPSCommentsTablePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
