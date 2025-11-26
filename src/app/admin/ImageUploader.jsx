"use client";
import React, { useEffect, useState } from "react";

const ImageUploader = ({ getChoosenFile }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [choosenFile, setChoosenFile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    fetch("/api/get-image")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []); // Use the array directly
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
        setLoading(false);
      });
  };
  return (
    <>
      <section id="img-uploader">
        {/* // File Upload Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold">File Manager</h1>
        </div>
        {/* // file upload section */}
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
        {/* file upload section end */}
        {loading ? (
          <p className="text-gray-500">Loading files...</p>
        ) : files.length === 0 ? (
          <p className="text-gray-500">No files found.</p>
        ) : (
          <>
            <p className="text-gray-500">Total Files: {files.length}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
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
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    ) // Sort by createdAt
                    .map((file, index) => (
                      <tr
                        key={index}
                        className="border-t"
                        onClick={() => getChoosenFile(file.name)}
                      >
                        <td className="p-3">{file.name}</td>
                        <td className="p-3">
                          {(file.size / 1024).toFixed(2)} KB
                        </td>
                        <td className="p-3">
                          {file.createdAt
                            ? new Date(file.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-3 text-center">
                          <a
                            href={`/images/blogs/${encodeURIComponent(
                              file.name
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline mr-2"
                          >
                            View
                          </a>
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDelete(file.name)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ImageUploader;
