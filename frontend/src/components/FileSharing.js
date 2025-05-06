import React, { useState, useEffect } from 'react';
import '../styles/FileSharing.css';
import { Upload, Trash2, Pencil, FileText, Download } from 'lucide-react';

function FileSharing() {
  const [files, setFiles] = useState([]);
  const [renamingFileId, setRenamingFileId] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files/list', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        console.error('Failed to fetch files');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (response.ok) {
        await fetchFiles();
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const deleteFile = async (publicId) => {
    try {
      const response = await fetch(`/api/files/delete?public_id=${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        await fetchFiles();
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const startRenaming = (publicId, currentName) => {
    setRenamingFileId(publicId);
    setNewFileName(currentName);
  };

  const cancelRenaming = () => {
    setRenamingFileId(null);
    setNewFileName('');
  };

  const renameFile = async (publicId) => {
    if (!newFileName.trim()) return;
    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('new_file_name', newFileName.trim());

    try {
      const response = await fetch('/api/files/rename', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      if (response.ok) {
        cancelRenaming();
        await fetchFiles();
      } else {
        console.error('Rename failed');
      }
    } catch (error) {
      console.error('Error renaming file:', error);
    }
  };

  const downloadFile = async (publicId) => {
    try {
      const response = await fetch(`/api/files/download/${encodeURIComponent(publicId)}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        window.open(data.url, '_blank');
      } else {
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="file-sharing-wrapper">
      <header className="file-header">
        <h1>Document Hub</h1>
        <p>Upload, view, and manage your files in one place.</p>
      </header>

      <div className="upload-section">
        <label className="upload-btn">
          <Upload size={20} />
          Upload File
          <input type="file" hidden onChange={uploadFile} />
        </label>
      </div>

      <div className="file-list">
        {files.length === 0 && <p>No files uploaded yet.</p>}
        {files.map((file) => (
          <div className="file-card" key={file.publicId}>
            <FileText size={32} />
            <div className="file-info">
              {renamingFileId === file.publicId ? (
                <>
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') renameFile(file.publicId);
                      if (e.key === 'Escape') cancelRenaming();
                    }}
                    autoFocus
                  />
                  <button onClick={() => renameFile(file.publicId)}>Save</button>
                  <button onClick={cancelRenaming}>Cancel</button>
                </>
              ) : (
                <h4 onClick={() => downloadFile(file.publicId)} style={{ cursor: 'pointer' }}>
                  {file.fileName}
                </h4>
              )}
            </div>
            <div className="file-actions">
              <button onClick={() => startRenaming(file.publicId, file.fileName)}><Pencil size={16} /></button>
              <button onClick={() => deleteFile(file.publicId)}><Trash2 size={16} /></button>
              <button onClick={() => downloadFile(file.publicId)}><Download size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileSharing;
