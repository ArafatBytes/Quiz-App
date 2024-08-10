import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classes from "../Styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
  const [state, setState] = useState(true);
  const floatingBtnRef = useRef();

  function floatingBtn() {
    if (state) {
      setState(false);
      floatingBtnRef.current.classList.remove(classes.floatingBtn);
    } else {
      setState(true);
      floatingBtnRef.current.classList.add(classes.floatingBtn);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={floatingBtnRef}
    >
      <span
        className={`material-icons-outlined ${classes.open}`}
        onClick={floatingBtn}
      >
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={floatingBtn}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.player}
        url={`https://www.youtube.com/watch?v=${id}`}
        width="300px"
        height="168px"
        controls={true}
        playing={!state}
      />
      <p>{title}</p>
    </div>
  );
}
