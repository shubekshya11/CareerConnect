"use client";

import { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import { handleDelete } from "../utils/fileHandlers";

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <AdminHeader />
      <section id="file-manager" className="container mx-auto py-0 py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold">File Manager</h1>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading files...</p>
        ) : files.length === 0 ? (
          <p className="text-gray-500">No files found.</p>
        ) : (
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
                {files.map((file, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{file.name}</td>
                    <td className="p-3">{(file.size / 1024).toFixed(2)} KB</td>
                    <td className="p-3">
                      {file.createdAt
                        ? new Date(file.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-3 text-center">
                      <a
                        href={
                          `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_BLOG_URL}` +
                          `${file.name}`
                        }
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
        )}
      </section>
    </>
  );
}
