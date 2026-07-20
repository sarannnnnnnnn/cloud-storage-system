import "./FilesCard.css";
import { FiFolder } from "react-icons/fi";

const FilesCard = ({ dashboard }) => {
  return (
    <div className="files-card">

      <div className="files-icon">
        <FiFolder />
      </div>

      <h3>Total Files</h3>

      <h1>{dashboard.total_files}</h1>

      <p>
        Files securely stored in your cloud
      </p>

      <div className="files-footer">
        <span>Cloud Storage</span>
      </div>

    </div>
  );
};

export default FilesCard;