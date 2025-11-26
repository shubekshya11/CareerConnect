"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import BlogEditor from "../../../components/BlogEditor";
import AdminHeader from "../../AdminHeader";
import ToastNotification from "@/app/components/ToastNotification";
// import ImageUploader from "../../ImageUploader";
import { handleDelete } from "../../utils/fileHandlers";
import PopUpBox from "../PopUpBox";

// Initial value for the editor
const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text. " },
    ],
  },
];

const BlogPortalCreateInner = () => {
  const searchParams = useSearchParams();
  let id = searchParams.get("id"); // Get id from URL (if exists)
  const router = useRouter();
  const [blogId, setBlogId] = useState(id || ""); // Initialize blogId with id or empty string
  const [onEditMode, setOnEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editorContent, setEditorContent] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showTrashConfirm, setShowTrashConfirm] = useState(false);
  const [deleteImageFromCloud, setDeleteImageFromCloud] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");


  // beforeunload referesh prompt
//   useEffect(() => {
//   const handleBeforeUnload = (event) => {
//     event.preventDefault(); // Some browsers require this
//     event.returnValue = "You will lose all your current progress";
//   };

//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, []);

  // Fetch existing blog data if editing
  useEffect(() => {
    console.log('Is Blog Id', blogId);
    if (blogId) {
      setLoading(true);
      fetchBlogData(blogId);
      setOnEditMode(true); // set onMode to true if id exists
      setImage('');
      console.log("Editing mode enabled for blog ID:", blogId);
      console.log("Image:", image);
    }
  }, [blogId, deleteImageFromCloud]);

  const fetchBlogData = async (blogId) => {
    try {
      const response = await fetch(`/api/blogPortal/${blogId}`);

      const data = await response.json();
      console.log('response is',data.content)

      setTitle(data.title || "");
      setAuthor(data.author || "");
      setImage(data.image || "");
      setStatus(data.status || "");
      setEditorContent(data.content);


      console.log (data);

    } catch (err) {
      console.error("Error fetching blog data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showImageUploader) {
      fetchFiles(); // only when modal opens
    }
  }, [showImageUploader]);

  // test
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length > 100) {
      setTitleError("Title cannot exceed 100 characters");
    } else {
      setTitleError("");
    }
    setTitle(newTitle);
  };

  const handleAuthorChange = (e) => {
    const newAuthor = e.target.value;
    if (newAuthor.length > 50) {
      setAuthorError("Author name cannot exceed 50 characters");
    } else {
      setAuthorError("");
    }
    setAuthor(newAuthor);
  };

  const handleSave = async (status = "draft") => {
    const requestOptions = {
      method: onEditMode ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        author,
        content: editorContent,
        image,
        status,
      }),
    };

    // api url
    const url = onEditMode ? `/api/blogPortal/${blogId}` : "/api/blogPortal";
    const response = await fetch(url, requestOptions);

    let responseData;
    try {
      responseData = await response.json();

      console.log ('responseData is',responseData);
    } catch (err) {
      console.error("Error parsing JSON response:", err);
      responseData = {};
    }

    console.log("Response Data:", responseData);

    if (response.ok) {
      // set id if it's a new post
      if (!onEditMode && responseData.postId) {
        // id = responseData.postId; // Get the postId from the response
        console.log (responseData);
        setBlogId(responseData.postId);
        // router.push(`/admin/blog-portal/create?id=${id}`); // Redirect to the same page with id
        setOnEditMode(true); // set onMode to true if id exists
        console.log("New post created with ID:", blogId);
        console.log("Response Data:", responseData);

        // set status to published
        if (responseData.status) {
          if (responseData.status === "published") {
            setStatus("published");
            setToastMessage(`Blog has been published!`);
          } else if (responseData.status === "draft") {
            setStatus("draft");
            setToastMessage("Blog saved to draft!");
          } else if (responseData.status === "archive") {
            setStatus("archive");
            setShowTrashConfirm(false);
          }
          setToastSuccess(true);
          setShowToast(true);

        }
      } else if (onEditMode) {
        // set status to published
        if (responseData.status) {
          if (responseData.status === "published") {
            setStatus("published");
            setToastMessage(`Blog has been updated and published!`);
          } else if (responseData.status === "draft") {
            setStatus("draft");
            setToastMessage("Draft updated!");
            setShowTrashConfirm(false);
          } else if (responseData.status === "archive") {
            setStatus("archive");
            setShowTrashConfirm(false);
          }
          setToastSuccess(true);
          setShowToast(true);
        }
      }
    } else if (response.status === 409) {
      setToastMessage(responseData.message);
      setToastSuccess(false);
      setShowToast(true);
    } else if (response.status === 400) {
      /* const data = await response.json(); */
      setToastMessage(responseData.message);
      setToastSuccess(false);
      setShowToast(true);
    } else {
      setToastMessage("Post failed to save.");
      setToastSuccess(false);
      setShowToast(true);
    }
  };
  /**
   * NEED TO TEST THIS LOGIC
   */
  const handleCancel = async () => {
    if (!onEditMode && image) {
      // Only delete uploaded image if it's a new post and an image was uploaded
      try {
        await fetch("/api/delete-image", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: image }),
        });
        setDeleteImageFromCloud(true);
      } catch (err) {
        console.error("Image delete error:", err);
      }
    }

    // Simply navigate back in both cases
    // router.push("/admin/blog-portal");
  };

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
      <AdminHeader />
      <section id="blog-edit" className="py-3">
        <div className="container">
          <div className="form-group d-flex flex-column">
            <div className="mb-3">
              <label htmlFor="name" className="form-label d-none">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="title"
                className={`form-control ${titleError ? 'is-invalid' : ''}`}
                placeholder="Enter title *"
                value={title}
                onChange={handleTitleChange}
                maxLength={100}
                required
              />
              <div className="d-flex justify-content-between align-items-center mt-1">
                {titleError && (
                  <div className="text-danger small">{titleError}</div>
                )}
                <div className={`small ms-auto ${title.length > 90 ? 'text-warning' : 'text-muted'}`}>
                  {title.length}/100
                </div>
              </div>
            </div>

            <div
              className="mb-3 image-uploader"
              onMouseOver={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
            >
              <div
                className="image-uploader-options"
                style={{ opacity: showOptions ? "1" : "0" }}
                onClick={() => setShowImageUploader(true)}
              >
                <div className="content">
                  <span className="d-flex align-items-center">
                    <i className="replace-uploaded-img-button material-icons">
                      upload
                    </i>{" "}
                    Replace Image
                  </span>
                  {/* <i className="reposition-uploaded-img-button material-icons" id="drag-indicator" style={{display: image ? "inline-block" : "none"}}onClick={(e)=> handleImageDrag(e)}>drag_indicator</i> */}
                </div>
              </div>
              {image ? (
                <>
                  <img
                    src={
                      `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_BLOG_URL}` +
                      `${image}`
                    }
                    alt="Preview"
                    id="previewImage"
                  />
                </>
              ) : (
                <>
                  <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <p className="text-muted text-center">Preview Image</p>
                  </div>
                </>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="author"
                className={`form-control ${authorError ? 'is-invalid' : ''}`}
                placeholder="Enter author"
                value={author}
                onChange={handleAuthorChange}
                maxLength={50}
              />
              <div className="d-flex justify-content-between align-items-center mt-1">
                {authorError && (
                  <div className="text-danger small">{authorError}</div>
                )}
                <div className={`small ms-auto ${author.length > 45 ? 'text-warning' : 'text-muted'}`}>
                  {author.length}/50
                </div>
              </div>
            </div>
            <div className="mb-3">
              {showImageUploader && (
                <>
                  {/* <PopUpBox
                    title="Upload Image"
                    show={showImageUploader}
                    onClose={() => setShowImageUploader(false)}
                    deleteImage={() => setDeleteImageFromCloud(true)}
                  >
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
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            ) // Sort by createdAt
                            .map((file, index) => (
                              <tr key={index} className="border-t">
                                <td className="p-3 td-fileName">
                                  <a
                                    onClick={() => {
                                      setImage(file.name);
                                      setShowImageUploader(false);
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
                                    ? new Date(
                                        file.createdAt
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </td>
                                <td className="p-3 d-flex align-items-center justify-content-center">
                                  <a
                                    href={
                                      `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_BLOG_URL}` +
                                      `${file.name}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mr-2"
                                  >
                                    <i className="material-icons cursor-pointer">
                                      visibility
                                    </i>
                                  </a>
                                  <button
                                    className="btn btn-link text-danger"
                                    onClick={async () => {

                                       try {
      const res = await handleDelete(file.name);
      if (res) {
        // Optionally handle success (e.g., update UI)
        console.log("File deleted successfully");
        fetchFiles();
        setDeleteImageFromCloud(true); // Set state to trigger re-fetch
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
                  </PopUpBox> */}
                  <PopUpBox
  show={showImageUploader}
  onClose={() => setShowImageUploader(false)}
  files={files}
  fetchFiles={fetchFiles}
  setImage={setImage}
  handleDelete={handleDelete}
  setSelectedFile={setSelectedFile}
  setLoading={setLoading}
/>
                </>
              )}
            </div>

            <div className="mb-3"></div>
            <div className="mb-3">
              <label className="form-label">
                Content <span className="text-danger">*</span>
              </label>

                   {loading ? (
      <div>Loading...</div>
    ) : (
      <BlogEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
    )}

            </div>
            {/* <button className="btn btn-primary" onClick={handleSave}>
            {id ? "Update Post" : "Save Post"}
          </button> */}
            {onEditMode && (
              <div className="d-flex gap-2 mt-3">
                {status !== "archive" ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSave("draft")}
                  >
                    {status === "draft" ? `Update Draft` : `Save as Draft`}
                  </button>
                ) : null}
                {status !== "archive" ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSave("published")}
                  >
                    {status === "published" ? `Update` : `Publish`}
                  </button>
                ) : null}

                {status !== "archive" ? (
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => setShowTrashConfirm(true)}
                  >
                    Move To Archive
                  </button>
                ) : (
                  <button
                    className="btn btn-dark ms-2"
                    onClick={() => setShowTrashConfirm(true)}
                  >
                    Restore To Draft
                  </button>
                )}
              </div>
            )}
            {!onEditMode && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => handleSave("draft")}
                >
                  Draft
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleSave("published")}
                >
                  Publish
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      {showTrashConfirm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {status === "archive" ? `Move to Draft?` : `Move to Archive?`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTrashConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  {status === "archive"
                    ? `Are you sure you want to restore this post?`
                    : `Are you sure you want to move this post to archive?`}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowTrashConfirm(false)}
                >
                  Cancel
                </button>
                {status === "archive" ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSave("draft")}
                  >
                    Restore To Draft
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleSave("archive")}
                  >
                    Move to Archive
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showCancelConfirm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Discard Changes?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCancelConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  {id
                    ? "Discard all unsaved changes?"
                    : "Are you sure you want to cancel?"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  No, go back
                </button>
                <button className="btn btn-danger" onClick={handleCancel}>
                  Yes, discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showToast && (
        <ToastNotification
          show={showToast}
          success={toastSuccess}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* // show current status */}
      <div className="ms-2">
        <span
          className={`badge ${
            status === "published"
              ? "bg-success"
              : status === "draft"
              ? "bg-warning"
              : "bg-secondary"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </>
  );
};

const BlogPortalCreate = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BlogPortalCreateInner />
  </Suspense>
);

export default BlogPortalCreate;
