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
import SurveyDashboard from "./pages/SurveyDashboard";
import EditSurvey from "./pages/EditSurvey";
import ShareSurvey from "./pages/ShareSurvey";
import ResponseSurvey from "./pages/ResponseSurvey";
import AnalyticsSurvey from "./pages/AnalyticsSurvey";
import PublicSurvey from "./pages/PublicSurvey";

function App() {
  // local variables
  const location = useLocation();

  return (
    <div className="font-poppins ">
      {/* conditional rendering of sidebar */}
      {location?.pathname?.includes("/login") ||
      location?.pathname?.includes("public-survey") ? null : (
        <Sidebar />
      )}
      {/* changing padding of main content according to the pathname */}
      <div
        className={`${
          location?.pathname?.includes("/login") ||
          location?.pathname?.includes("public-survey")
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
            {/* google */}
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
            {/* nps */}
            <Route path="/nps-dashboard" element={<NPSDashboard />} />
            <Route
              path="/nps-dashboard/sentiments"
              element={<NPSSentimentsTablePage />}
            />
            <Route
              path="/nps-dashboard/comments"
              element={<NPSCommentsTablePage />}
            />
            {/* survey */}
            <Route path="/survey-dashboard" element={<SurveyDashboard />} />
            <Route
              path="/survey-dashboard/survey_edit/:survey_id"
              element={<EditSurvey />}
            />
            <Route
              path="/survey-dashboard/survey_share/:survey_id"
              element={<ShareSurvey />}
            />

            <Route
              path="/survey-dashboard/survey_responses/:survey_id"
              element={<ResponseSurvey />}
            />

            <Route
              path="/survey-dashboard/survey_analytics/:survey_id"
              element={<AnalyticsSurvey />}
            />

            <Route
              path="/public-survey/:survey_id"
              element={<PublicSurvey />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
