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
  FiEdit2,
  FiEye,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../api/api";
import "./FilesTable.css";

const FilesTable = ({ fetchDashboard }) => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showRename, setShowRename] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newName, setNewName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewFile, setPreviewFile] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

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

const deleteFile = (file) => {

  setSelectedFile(file);

  setConfirmOpen(true);

};

const confirmDelete = async () => {

  try {

    await api.delete(
      `/delete/${encodeURIComponent(selectedFile.filename)}`
    );

    toast.success("File deleted successfully.");

    setConfirmOpen(false);

    setSelectedFile(null);

    fetchFiles();

    if (fetchDashboard) {
      fetchDashboard();
    }

  } catch (err) {

    console.log(err);

    toast.error("Delete failed.");

  }

};

const renameFile = async () => {
  if (!newName.trim()) {
    toast.error("Enter a file name.");
    return;
  }

  try {
    await api.patch(`/rename/${selectedFile.id}`, {
      new_name: newName,
    });

    toast.success("File renamed successfully.");

    setShowRename(false);

    setNewName("");

    setSelectedFile(null);

    fetchFiles();

    if (fetchDashboard) {
      fetchDashboard();
    }

  } catch (err) {
    toast.error(
      err.response?.data?.detail || "Rename failed."
    );
  }
};
const previewFileHandler = async (filename) => {
  try {

    const res = await api.get(
      `/preview/${encodeURIComponent(filename)}`
    );

    setPreviewUrl(res.data.preview_url);
    setPreviewFile(filename);
    setShowPreview(true);

  } catch (err) {

    console.log(err);
    toast.error("Preview failed.");
  }
};

  return (
  <>
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
  className="preview-btn"
  onClick={() =>
    previewFileHandler(file.filename)
  }
>
  <FiEye />
</button>
                  <button
                    className="download-btn"
                    onClick={() =>
                      downloadFile(file.filename)
                    }
                  >

                    <FiDownload />

                  </button>
                    <button
  className="rename-btn"
  onClick={() => {
    setSelectedFile(file);
    setNewName(file.filename);
    setShowRename(true);
  }}
>
  <FiEdit2 />
</button>
                  <button
                    className="delete-btn"
                    onClick={() =>
  deleteFile(file)
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

    {showRename && (
  <div className="rename-overlay">
    <div className="rename-modal">

      <h2>Rename File</h2>

      <p>Enter a new file name</p>

      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <div className="rename-actions">

        <button
          className="cancel-btn"
          onClick={() => {
            setShowRename(false);
            setSelectedFile(null);
            setNewName("");
          }}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          onClick={renameFile}
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}

{showPreview && (
  <div className="preview-overlay">
    <div className="preview-modal">

      <div className="preview-header">
        <h2>{previewFile}</h2>

        <button
          className="close-preview"
          onClick={() => {
            setShowPreview(false);
            setPreviewUrl("");
            setPreviewFile("");
          }}
        >
          ✕
        </button>
      </div>

      <div className="preview-body">
        <img
          src={previewUrl}
          alt={previewFile}
          className="preview-image"
        />
      </div>

    </div>


  </div>
)}

{confirmOpen && (
  <div className="confirm-overlay">

    <div className="confirm-modal">

      <h2>Move to Trash</h2>

      <p>
        Move "{selectedFile.filename}" to Trash?
      </p>

      <div className="confirm-actions">

        <button
          className="confirm-cancel"
          onClick={()=>{
            setConfirmOpen(false);
            setSelectedFile(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-delete"
          onClick={confirmDelete}
        >
          Move
        </button>

      </div>

    </div>

  </div>
)}
</>
  );
};

export default FilesTable;