"use client";

import { useState } from "react";
import axios from "axios";
import saveAs from "file-saver";
import { FileText } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState("");

  const handleGenerateDocx = async () => {
    if (!fullName || !birthDate || !age) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/generate-docx",
        {
          fullName,
          birthDate: format(new Date(birthDate), "d MMMM yyyy 'yil'"),
          age,
        },
        { responseType: "blob" }
      );

      saveAs(response.data, "generated-document.docx");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Word Document Generator
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <button
            onClick={handleGenerateDocx}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FileText className="w-5 h-5" />
            <span>Generate DOCX</span>
          </button>
        </div>
      </div>
    </div>
  );
}
