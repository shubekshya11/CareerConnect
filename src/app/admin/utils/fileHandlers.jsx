// Delete handler (optional implementation)
export async function handleDelete(fileName) {
    if (confirm("Are you sure you want to delete this file?")) {
      const res = await fetch(`/api/delete-image?file=${fileName}`, { method: "DELETE" });
      if (res.ok) {
        // Refresh or update state after deletion
        // window.location.reload();
        return res;
      } else {
        alert("Failed to delete the file.");
      }
    }
  }