<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
/>

import { useState, useRef } from "react";

/* ✅ Speech API support */
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function CreateIssue() {
  const [form, setForm] = useState({
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    ward: "",
  });

  // 🎤 START SPEECH
  const startListening = () => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Use Chrome for speech recognition");
    return;
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }

    setForm((prev) => ({
      ...prev,
      description: text,
    }));
  };

  recognition.onend = () => {
    if (listening) recognition.start(); // 👈 auto restart
  };

  recognition.start();
  recognitionRef.current = recognition;
  setListening(true);
};


  // 🛑 STOP SPEECH
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSubmit = () => {
    console.log("FINAL ISSUE DATA:", {
      ...form,
      userDetails,
    });

    alert("Issue submitted successfully ✅");
    setShowModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Report an Issue</h1>

      {/* FORM */}
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
          <option value="Garbage">Garbage</option>
          <option value="Pothole">Pothole</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Water">Water Issue</option>
        </select>

        {/* Description with Mic */}
        <div className="relative">
          <textarea
            className="w-full border p-3 rounded pr-12 text-black"
            rows="4"
            placeholder="Describe the issue..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

                    <button
            type="button"
            onClick={listening ? stopListening : startListening}
            className={`absolute right-3 top-3 p-2 rounded-full shadow 
                ${listening ? "bg-red-600 text-white animate-pulse" : "bg-gray-200 text-black"}
            `}
            >
            <i className={`bi ${listening ? "bi-mic-fill" : "bi-mic"}`}></i>
            </button>
        </div>

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImage} />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded-lg mt-3"
          />
        )}

        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded"
        >
          Submit Issue
        </button>
      </form>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              Confirm Your Details
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, mobile: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border p-2 rounded"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, city: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full border p-2 rounded"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, pincode: e.target.value })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Ward Number"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, ward: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
