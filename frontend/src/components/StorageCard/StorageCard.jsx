import "./StorageCard.css";
import { FiHardDrive } from "react-icons/fi";

const StorageCard = ({ dashboard }) => {

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
  };

  const percentage =
    (dashboard.storage_used / dashboard.storage_limit) * 100;

  return (
    <div className="storage-card">

      <div className="card-icon">
        <FiHardDrive />
      </div>

      <h3>Storage Used</h3>

      <h1>{formatFileSize(dashboard.storage_used)}</h1>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        ></div>

      </div>

      <p>
        {formatFileSize(dashboard.storage_used)}
        {" of "}
        {formatFileSize(dashboard.storage_limit)}
      </p>

      <span>{percentage.toFixed(2)}% Used</span>

    </div>
  );
};

export default StorageCard;