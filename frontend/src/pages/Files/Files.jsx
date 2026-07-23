import "../Dashboard/Dashboard.css";
import FilesTable from "../../components/FilesTable/FilesTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

const Files = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar fetchDashboard={() => {}} />
        <FilesTable />
      </div>
    </div>
  );
};

export default Files;