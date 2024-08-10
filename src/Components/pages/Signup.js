import signupImage from "../../assets/images/signup.svg";
import Illustration from "../Illustration";
import SignupForm from "../SignupForm";

export default function Signup() {
  return (
    <div>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration img={signupImage} />
        <SignupForm />
      </div>
    </div>
  );
}
