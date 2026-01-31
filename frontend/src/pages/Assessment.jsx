import { useEffect, useState } from "react";
import api from "../services/api";

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
    <div style={{ padding: "20px" }}>
      <h2>Skill Assessment</h2>

      {!selectedSkill && (
        <div>
          <h3>Select Skill</h3>
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => loadQuestions(skill)}
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}

      {selectedSkill && !result && (
        <div>
          <h3>{selectedSkill.name} Questions</h3>

          {questions.map((q) => (
            <div key={q.id}>
              <p>{q.question_text}</p>
              <input
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
            onClick={submitAnswers}
            disabled={questions.length === 0}
          > 
            Submit
          </button>

        </div>
      )}

      {result && (
        <div>
          <h3>Result</h3>
          <p>Score: {result.score}%</p>
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
