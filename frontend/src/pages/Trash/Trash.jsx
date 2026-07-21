import "../Dashboard/Dashboard.css";
import "./Trash.css";
import { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiFile,
  FiImage,
  FiFilm,
  FiMusic,
  FiArchive,
  FiFileText,
  FiRotateCcw,
  FiTrash2,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../api/api";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

const Trash = () => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [confirmType, setConfirmType] = useState("");
const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchTrash();
  }, []);

  const fetchTrash = async () => {
    try {
      setLoading(true);

      const res = await api.get("/trash");

      setFiles(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load Trash.");
    } finally {
      setLoading(false);
    }
  };

  const restoreFile = (file) => {
  setSelectedFile(file);
  setConfirmType("restore");
  setConfirmOpen(true);
};

  const deleteForever = (file) => {
  setSelectedFile(file);
  setConfirmType("delete");
  setConfirmOpen(true);
};

const confirmAction = async () => {
  try {
    if (confirmType === "restore") {
      await api.patch(`/restore/${selectedFile.id}`);
      toast.success("File restored successfully.");
    }

    if (confirmType === "delete") {
      await api.delete(`/delete-permanent/${selectedFile.id}`);
      toast.success("File permanently deleted.");
    }

    setConfirmOpen(false);
    setSelectedFile(null);

    fetchTrash();

  } catch (err) {
    console.log(err);
    toast.error("Operation failed.");
  }
};

  const formatSize = (bytes) => {
    if (!bytes) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];

    let size = bytes;
    let index = 0;

    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
  };

  const fileIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
      return <FiImage />;

    if (["mp4", "mov", "avi", "mkv"].includes(ext))
      return <FiFilm />;

    if (["mp3", "wav"].includes(ext))
      return <FiMusic />;

    if (["zip", "rar", "7z"].includes(ext))
      return <FiArchive />;

    if (["pdf", "doc", "docx", "txt"].includes(ext))
      return <FiFileText />;

    return <FiFile />;
  };

  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.filename.toLowerCase().includes(search.toLowerCase())
    );
  }, [files, search]);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <Topbar />

        <motion.div
          className="files-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="table-header">

            <h2>Trash</h2>

            <div className="search-box-table">

              <FiSearch />

              <input
                placeholder="Search Trash..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {loading ? (

            <div className="empty">

              Loading...

            </div>

          ) : filteredFiles.length === 0 ? (

            <div className="empty">

              Trash is empty.

            </div>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>File</th>

                  <th>Size</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredFiles.map((file) => (

                  <tr key={file.id}>

                    <td>

                      <div className="file-name">

                        <span className="file-icon">

                          {fileIcon(file.filename)}

                        </span>

                        {file.filename}

                      </div>

                    </td>

                    <td>

                      {formatSize(file.file_size)}

                    </td>

                    <td>

                      <button
                        className="download-btn"
                        onClick={() => restoreFile(file)}
                        title="Restore"
                      >
                        <FiRotateCcw />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteForever(file)}
                        title="Delete Forever"
                      >
                        <FiTrash2 />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </motion.div>

      </div>
{confirmOpen && (
  <div className="confirm-overlay">

    <div className="confirm-modal">

      <h2>
        {confirmType === "restore"
          ? "Restore File"
          : "Delete Forever"}
      </h2>

      <p>
        {confirmType === "restore"
          ? `Restore "${selectedFile.filename}" ?`
          : `Permanently delete "${selectedFile.filename}" ?`}
      </p>

      <div className="confirm-actions">

        <button
          className="confirm-cancel"
          onClick={() => {
            setConfirmOpen(false);
            setSelectedFile(null);
          }}
        >
          Cancel
        </button>

        <button
          className={
            confirmType === "restore"
              ? "confirm-restore"
              : "confirm-delete"
          }
          onClick={confirmAction}
        >
          {confirmType === "restore"
            ? "Restore"
            : "Delete Forever"}
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default Trash;