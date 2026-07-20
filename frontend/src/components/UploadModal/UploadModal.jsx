import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiX } from "react-icons/fi";
import api from "../../api/api";
import { toast } from "react-toastify";
import "./UploadModal.css";

const UploadModal = ({ isOpen, onClose, fetchDashboard }) => {
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

const handleFiles = (files) => {
  if (!files.length) return;
  setSelectedFiles(files);
};

  const browseFiles = () => {
  fileInputRef.current.click();
};

const browseFolder = () => {
  folderInputRef.current.click();
};

  const uploadFile = async () => {

  if (selectedFiles.length === 0) {
    toast.warning("Please select at least one file.");
    return;
  }

  try {

    setUploading(true);

    for (let i = 0; i < selectedFiles.length; i++) {

      const file = selectedFiles[i];

      const formData = new FormData();
      formData.append("file", file);

      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (event) => {

          const percent = Math.round(
            ((i + event.loaded / event.total) / selectedFiles.length) * 100
          );

          setProgress(percent);

        },
      });

    }

    setProgress(100);

    toast.success("All files uploaded successfully!");

    setSelectedFiles([]);

    if (fetchDashboard) {
      fetchDashboard();
    }

    onClose();

  } catch (err) {

    if (err.response?.status === 409) {
      toast.warning("File already exists.");
    } else if (err.response?.status === 400) {
      toast.error("Storage limit exceeded.");
    } else {
      toast.error("Upload failed.");
    }

  } finally {

    setUploading(false);
    setProgress(0);

  }

};

  return (
    <div className="upload-overlay">

      <motion.div
        className="upload-modal"
        initial={{ opacity: 0, y: -40, scale: .95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >

        <button
          className="close-btn"
          onClick={onClose}
        >
          <FiX />
        </button>

        <h2>Upload File</h2>

        <div
          className="drop-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
    e.preventDefault();
    handleFiles(Array.from(e.dataTransfer.files));
}}
        >
          <FiUploadCloud className="upload-icon" />

         <h3>Select Upload Type</h3>

<p>Choose Files or Folder</p>

<div className="upload-options">

  <button
    type="button"
    className="upload-option-btn"
    onClick={browseFiles}
  >
    📄 Upload Files
  </button>

  <button
    type="button"
    className="upload-option-btn"
    onClick={browseFolder}
  >
    📁 Upload Folder
  </button>

</div>

          {/* File Upload */}
<input
  ref={fileInputRef}
  hidden
  type="file"
  multiple
  onChange={(e) => handleFiles(Array.from(e.target.files))}
/>

{/* Folder Upload */}
<input
  ref={folderInputRef}
  hidden
  type="file"
  webkitdirectory=""
  onChange={(e) => handleFiles(Array.from(e.target.files))}
/>
        </div>

        {selectedFiles.length > 0 && (

<div className="upload-selected-files">
  <h3>{selectedFiles.length} File(s) Selected</h3>

  <div className="upload-files-list">
    {selectedFiles.map((file, index) => (
      <div className="upload-file-item" key={index}>
        <div className="upload-file-name">
          📄 {file.name}
        </div>

        <div className="upload-file-size">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>
    ))}
  </div>
</div>

)}

        {uploading && (
          <>
            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <p>{progress}%</p>
          </>
        )}

        <button
          className="upload-submit"
          onClick={uploadFile}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

      </motion.div>

    </div>
  );
};

export default UploadModal;