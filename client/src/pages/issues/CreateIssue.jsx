import { useState } from "react";

export default function CreateIssue() {
  const [form, setForm] = useState({
    category: "",
    description: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the data
    console.log("ISSUE SUBMITTED:", {
      ...form,
      location: "auto-detect later",
    });

    alert("Issue submitted (mock). Check console.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Report an Issue</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <select
          className="w-full border p-3 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="garbage">Garbage</option>
          <option value="pothole">Pothole</option>
          <option value="streetlight">Streetlight</option>
          <option value="water">Water Issue</option>
        </select>

        {/* Description */}
        <textarea
          className="w-full border p-3 rounded"
          rows="4"
          placeholder="Describe the issue..."
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
}
