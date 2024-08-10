import { useRef, useState } from "react";
import classes from "../Styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ nextQ, prevQ, progress, submit }) {
  const tooltipRef = useRef();
  const [state, setState] = useState(false);

  function tooltipState() {
    if (state) {
      setState(false);
      tooltipRef.current.style.display = "none";
    } else {
      setState(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = "block";
    }
  }

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prevQ}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={tooltipState}
            onMouseOut={tooltipState}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : nextQ}
      >
        <span>{progress === 100 ? `Submit Now` : `Next Question`}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
