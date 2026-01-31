import { useState } from "react";
import api from "../services/api";
import "./ResumeUpload.css";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [uploading, setUploading] = useState(false);


  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);  
      const res = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSkills(res.data.extracted_skills);
    } catch (err) {
      alert("Resume upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="resume-container">

      <div className="resume-card">
        <h2>Upload Your Resume</h2>
        <p>Supported formats: PDF, DOCX</p>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={uploadResume} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

        {skills.length > 0 && (
          <div className="skills-section">
            <h3>Extracted Skills</h3>

            <div className="skill-tags">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );

}
     