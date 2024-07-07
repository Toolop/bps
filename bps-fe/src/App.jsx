import { Route, Routes } from "react-router-dom";
import BoardLayout from "./component/organisms/board";
import Login from "./pages/login";
import MiddlewareUser from "./component/middleware/middleware";
import BoardAdminLayout from "./component/organisms/boardAdmin";
import DashboardAdmin from "./pages/admin/dashboard";
import UserAdmin from "./pages/admin/user";
import Register from "./pages/login/register";
import TeamPage from "./pages/admin/team";
import SchedulePage from "./pages/admin/schedule";
import AnggotaTeamPage from "./pages/admin/aggotateam";
import { DashboardTv } from "./pages/tv/dashboard";
import BoardTvLayout from "./component/organisms/boardTv";
import StaffDashboard from "./pages/staff/dashboard/dashboard";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<MiddlewareUser />}></Route>
      <Route path="staff" element={<BoardLayout />}>
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="anggota" element={<AnggotaTeamPage />} />
      </Route>
      <Route path="tv" element={<BoardTvLayout />}>
        <Route path="dashboard" element={<DashboardTv />} />
      </Route>
      <Route path="admin" element={<BoardAdminLayout />}>
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="user" element={<UserAdmin />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="anggota" element={<AnggotaTeamPage />} />
        <Route path="schedule" element={<SchedulePage />} />
      </Route>
    </Routes>
  );
}

export default App;
