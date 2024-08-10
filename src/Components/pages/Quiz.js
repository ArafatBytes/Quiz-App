import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "question":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const answer = _.cloneDeep(state);
      answer[action.questionID].options[action.optionID].checked = action.value;
      return answer;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currectQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "question",
      value: questions,
    });
  }, [questions]);

  function handleAnswer(e, index) {
    dispatch({
      type: "answer",
      questionID: currectQuestion,
      optionID: index,
      value: e.target.checked,
    });
  }

  function nextQuestion() {
    if (currectQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  function prevQuestion() {
    if (currectQuestion + 1 > 0 && currectQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  const precentage = ((currectQuestion + 1) / questions.length) * 100;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const answerRef = ref(db, `result/${uid}`);
    await set(answerRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, { state: qna });
  }

  const data = useLocation();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currectQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answers
            input={true}
            options={qna[currectQuestion].options}
            handleAnswer={handleAnswer}
          />
          <ProgressBar
            nextQ={nextQuestion}
            prevQ={prevQuestion}
            progress={precentage}
            submit={submit}
          />
          <MiniPlayer id={id} title={data.state} />
        </>
      )}
    </>
  );
}
