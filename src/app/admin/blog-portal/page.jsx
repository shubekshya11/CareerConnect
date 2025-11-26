"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "../AdminHeader";
import { generateSlug } from "../../api/blogPortal/generateSlug";

const BlogTable = ({ blogs, onDelete }) => (
  <div className="table-responsive">
    <table className="table border border-1">
      <thead className="table-light">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>Slug</th>
          <th>Status</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id} className="border-bottom">
            <td>{blog.title}</td>
            <td>{blog.author}</td>
            <td>{new Date(blog.created_at).toLocaleDateString()}</td>
            <td>{blog.slug}</td>
            <td>{blog.status}</td>
            <td className="text-center d-flex align-items-center">
              <Link
                href={`./blog-portal/create?id=${blog.id}`}
                className="text-primary me-2"
              >
                <span className="material-icons">edit</span>
              </Link>
              <button
                className="btn btn-link text-danger p-0"
                style={{ cursor: "pointer" }}
                onClick={() => onDelete(blog.id, blog.title)}
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

export default function BlogPortal() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogPortal");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId, blogTitle) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/blogPortal/${blogId}`);
      const data = await response.json();

      const slug = generateSlug(data.title);

      const randomStr = Math.random().toString(36).substring(2, 8);
      const newSlug = `${slug}-trashed-${randomStr}`;

      
      const res = await fetch(`/api/blogPortal/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogTitle,
          author: data.author,
          slug: newSlug,
          content: data.content, 
          image: data.image,
          status: "archive",
        }),
      });
    

      if (res.ok) {
        alert("Blog moved to archive successfully.");
        fetchBlogs();
      } else {
        alert("Error moving blog to archive.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <section id="blog-portal" className="container mx-auto py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Dashboard</h1>
          <div className="d-flex gap-2">
            <Link href="./blog-portal/create">
              <div className="btn-sakchha-primary p-2 border rounded">
                Create New Blog
              </div>
            </Link>
            <Link href="./blog-portal/archive">
              <div className="btn-danger p-2 border rounded">Archive</div>
            </Link>
          </div>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <BlogTable blogs={blogs} onDelete={handleDelete} />
        )}
      </section>
    </>
  );
}
