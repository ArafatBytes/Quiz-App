import classes from "../Styles/Illustration.module.css";

export default function Illustration({ img }) {
  return (
    <div className={classes.illustration}>
      <img src={img} alt="Signup" />
    </div>
  );
}
