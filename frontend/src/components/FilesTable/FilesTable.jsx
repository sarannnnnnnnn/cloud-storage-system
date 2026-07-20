import { useEffect, useMemo, useState } from "react";
import {
  FiDownload,
  FiTrash2,
  FiSearch,
  FiFile,
  FiImage,
  FiFilm,
  FiMusic,
  FiArchive,
  FiFileText,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../api/api";
import "./FilesTable.css";

const FilesTable = ({ fetchDashboard }) => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const response = await api.get("/files");

      setFiles(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

 const downloadFile = async (filename) => {
  try {
    const response = await api.get(
      `/download/${encodeURIComponent(filename)}`
    );

    window.open(response.data.download_url, "_blank");

  } catch (err) {
    console.log(err);
    toast.error("Download failed.");
  }
};

const deleteFile = async (filename) => {
  const ok = window.confirm(`Delete "${filename}" ?`);

  if (!ok) return;

  try {

    await api.delete(
      `/delete/${encodeURIComponent(filename)}`
    );

    toast.success("File deleted successfully.");

    fetchFiles();

    if (fetchDashboard) {
      fetchDashboard();
    }

  } catch (err) {
    console.log(err);
    toast.error("Delete failed.");
  }
};

  return (
    <motion.div
      className="files-table"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="table-header">

        <h2>My Files</h2>

        <div className="search-box-table">

          <FiSearch />

          <input
            placeholder="Search files..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {loading ? (

        <div className="empty">
          Loading files...
        </div>

      ) : filteredFiles.length === 0 ? (

        <div className="empty">
          No files found.
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
                    onClick={() =>
                      downloadFile(file.filename)
                    }
                  >

                    <FiDownload />

                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteFile(file.filename)
                    }
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
  );
};

export default FilesTable;