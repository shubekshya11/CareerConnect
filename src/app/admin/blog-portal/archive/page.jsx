"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "../../AdminHeader";

const TrashTable = ({ blogs , onDelete }) => (
  <div>
    <table className="table table-bordered table-hover shadow-sm rounded">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Date</th>
          <th scope="col">Slug</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id}>
            <td>{blog.title}</td>
            <td>{blog.author}</td>
            <td>{new Date(blog.created_at).toLocaleDateString()}</td>
            <td>{blog.slug}</td>
            <td>{blog.status}</td>
            <td>
              <Link
                href={`./create?id=${blog.id}`}
                className="text-primary pe-3"
              >
                <span className="material-icons">edit</span>
              </Link>

              <button
                className="text-danger"
                onClick={() => onDelete(blog.id)}
                style={{ cursor: "pointer" }}
              >
                <span className="material-icons">delete</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function BlogTrash() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogPortal/archive");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  //delete blog
   const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this blog post?")) return;

    try {
      const res = await fetch(`/api/blogPortal/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      } else {
        const errorText = await res.text();
        alert(`Failed to delete: ${errorText}`);
      }
    } catch (error) {
      alert("Error deleting blog post.");
      console.error(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <section id="blog-portal" className="container mx-auto py-0 py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Archive</h1>
          <Link href="./">
            <div className="btn-sakchha-primary p-2 border rounded">Blogs</div>
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <TrashTable blogs={blogs} onDelete={handleDelete} />
        )}
      </section>
    </>
  );
}
