import "./Dashboard.css";
import { useEffect, useState } from "react";
import api from "../../api/api";

import FilesCard from "../../components/FilesCard/FilesCard";
import FilesTable from "../../components/FilesTable/FilesTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Welcome from "../../components/Welcome/Welcome";
import StorageCard from "../../components/StorageCard/StorageCard";
import StorageProgress from "../../components/StorageProgress/StorageProgress";
import RecentUploads from "../../components/RecentUploads/RecentUploads";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  if (!dashboard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

       <Topbar fetchDashboard={fetchDashboard} />

        <Welcome dashboard={dashboard} />

        <div className="stats-grid">

          <StorageCard dashboard={dashboard} />

          <FilesCard dashboard={dashboard} />

        </div>

        <StorageProgress dashboard={dashboard} />

        <RecentUploads dashboard={dashboard} />

<FilesTable fetchDashboard={fetchDashboard} />

      </div>

    </div>
  );
};

export default Dashboard;