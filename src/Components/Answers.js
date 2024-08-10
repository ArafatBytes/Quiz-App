import classes from "../Styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], handleAnswer, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => {
        return (
          <>
            {input ? (
              <Checkbox
                className={classes.answer}
                text={option.title}
                value={index}
                checked={option.checked}
                onChange={(e) => {
                  handleAnswer(e, index);
                }}
              />
            ) : (
              <Checkbox
                className={`${classes.answer} ${
                  option.correct
                    ? classes.correct
                    : option.checked
                    ? classes.wrong
                    : null
                }`}
                text={option.title}
                defaultChecked={option.checked}
                disabled
              />
            )}
          </>
        );
      })}
    </div>
  );
}
