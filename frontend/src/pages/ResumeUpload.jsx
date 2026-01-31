import { useState } from "react";
import api from "../services/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSkills(res.data.extracted_skills);
    } catch (err) {
      alert("Resume upload failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadResume}>Upload</button>

      {skills.length > 0 && (
        <div>
          <h3>Extracted Skills</h3>
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
