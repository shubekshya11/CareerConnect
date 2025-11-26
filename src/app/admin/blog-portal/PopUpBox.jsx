// import React from 'react';
// import PropTypes from 'prop-types';

// const PopUpBox = ({ title, children, show, onClose, deleteImage }) => {
//     return (
//         <div className={`modal modal-xl fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
//             <div className="modal-dialog" role="document" style={{zIndex: 9999}}>
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">{title}</h5>
//                         <button type="button" className="close" onClick={onClose} aria-label="Close">
//                             <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
//                         {children}
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" onClick={onClose}>
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             {show && <div className="modal-backdrop fade show"></div>}
//         </div>
//     );
// };

// PopUpBox.propTypes = {
//     title: PropTypes.string.isRequired,
//     children: PropTypes.node.isRequired,
//     show: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
// };

// export default PopUpBox;


import React from "react";
import PropTypes from "prop-types";

const PopUpBox = ({
  show,
  onClose,
  files,
  fetchFiles,
  setImage,
  handleDelete,
  setSelectedFile,
  setLoading,
}) => {
  return (
    <div
      className={`modal modal-xl fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-xl" role="document" style={{ zIndex: 9999 }}>
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Upload Image</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append("file", file);
                  setLoading(true);
                  fetch("/api/upload-image", {
                    method: "POST",
                    body: formData,
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log("Upload response:", data);
                      setSelectedFile(data.file || []);
                      setLoading(false);
                    })
                    .catch((error) => {
                      console.error("Error uploading files:", error);
                      setLoading(false);
                    })
                    .finally(() => {
                      fetchFiles();
                    });
                }}
              />
            </div>

            <p className="text-gray-500">Total Files: {files.length}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full table table-hover border border-gray-200 shadow-md rounded-lg img-uploader-table">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Filename</th>
                    <th className="p-3 text-left">Size</th>
                    <th className="p-3 text-left">Uploaded At</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((file, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3 td-fileName">
                          <a
                            onClick={() => {
                              setImage(file.name);
                              onClose();
                            }}
                          >
                            {file.name}
                          </a>
                        </td>
                        <td className="p-3">
                          {(file.size / 1024).toFixed(2)} KB
                        </td>
                        <td className="p-3">
                          {file.createdAt
                            ? new Date(file.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-3 d-flex align-items-center justify-content-center">
                          <a
                            href={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_BLOG_URL}${file.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline mr-2"
                          >
                            <i className="material-icons cursor-pointer">visibility</i>
                          </a>
                          <button
                            className="btn btn-link text-danger"
                            onClick={async () => {
                              try {
                                const res = await handleDelete(file.name);
                                if (res) {
                                  console.log("File deleted successfully");
                                  fetchFiles();
                                  setImage('');
                                }
                              } catch (error) {
                                console.error("Error deleting file:", error);
                              }
                            }}
                          >
                            <i className="material-icons text-danger cursor-pointer">
                              delete
                            </i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

PopUpBox.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default PopUpBox;
