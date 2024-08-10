import Answers from "../Components/Answers";
import classes from "../Styles/Question.module.css";

export default function Question({ answer }) {
  return (
    <div className={classes.question}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>
      <Answers options={answer.options} />
    </div>
  );
}
