import { useEffect, useState } from "react";
import api from "../services/api";
import "./Assessment.css";

export default function Assessment() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get("/skills").then((res) => setSkills(res.data));
  }, []);

  const loadQuestions = async (skill) => {
    setSelectedSkill(skill);
    setResult(null);

    const res = await api.get(`/questions/${skill.id}`);
    setQuestions(res.data);
    setAnswers({});
  };

  const submitAnswers = async () => {
    const payload = Object.keys(answers).map((qid) => ({
      question_id: Number(qid),
      answer: answers[qid],
    }));

    const res = await api.post(
      `/questions/submit/${selectedSkill.id}`,
      payload
    );

    setResult(res.data);
  };

  return (
    <div className="assessment-container">

      <h2>Skill Assessment</h2>

      {/* SKILL SELECTION */}
      {!selectedSkill && (
        <div className="skill-select">
          <h3>Select a Skill</h3>

          <div className="skill-buttons">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => loadQuestions(skill)}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTIONS */}
      {selectedSkill && !result && (
        <div className="question-section">
          <h3>{selectedSkill.name} Assessment</h3>

          {questions.map((q, index) => (
            <div className="question-card" key={q.id}>
              <p>
                <strong>Q{index + 1}.</strong> {q.question_text}
              </p>

              <input
                type="text"
                placeholder="Your answer"
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    [q.id]: e.target.value,
                  })
                }
              />
            </div>
          ))}

          <button
            className="submit-btn"
            onClick={submitAnswers}
            disabled={questions.length === 0}
          >
            Submit Assessment
          </button>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="result-card">
          <h3>Assessment Result</h3>

          <h1>{result.score}%</h1>

          <p>
            Correct: {result.correct} / {result.total}
          </p>

          <button onClick={() => setSelectedSkill(null)}>
            Take Another Skill
          </button>
        </div>
      )}

    </div>
  );

}
