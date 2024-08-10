import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  const { loading, error, answers } = useAnswers(id);

  function countScore() {
    let score = 0;

    answers.forEach((answer, index1) => {
      let solutionAnswer = [];
      let myAnswer = [];
      answer.options.forEach((option, index2) => {
        if (option.correct) {
          solutionAnswer.push(index2);
        }
        if (state[index1].options[index2].checked) {
          myAnswer.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(solutionAnswer, myAnswer)) {
        score = score + 5;
      }
    });
    return score;
  }

  const userScore = countScore();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
