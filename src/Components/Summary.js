import classes from "../Styles/Summary.module.css";
import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";

export default function Summary({ score, noq }) {
  function generateKey() {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${generateKey()}`,
    "GET",
    {
      Authorization: process.env.REACT_APP_PEXELS_API,
    }
  );

  const image = result ? result.photos[0].src.large : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* <!-- progress bar will be placed here --> */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div>Loading your badge...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && result && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
