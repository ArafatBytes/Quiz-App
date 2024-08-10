import classes from "../Styles/Analysis.module.css";
import Question from "./Question";

export default function Analysis({ answers = [] }) {
  return answers.map((answer) => (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <Question answer={answer} />
    </div>
  ));
}
