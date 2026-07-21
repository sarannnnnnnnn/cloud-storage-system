import "../Dashboard/Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import FilesTable from "../../components/FilesTable/FilesTable";

const Files = () => {

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Topbar />

        <FilesTable />

      </div>

    </div>

  );

};

export default Files;