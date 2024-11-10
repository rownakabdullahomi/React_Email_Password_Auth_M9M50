import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.init";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    setErrorMessage("");
    setSuccessMessage(false);

    if (!terms) {
      setErrorMessage("Accept Terms and Conditions");
    }

    if (password.length < 6) {
      setErrorMessage("Password must be 6 characters.");
      return;
    }

    const passwordRegex =
      /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[\W_])).{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At least one number, one uppercase, one lowercase and one special character"
      );
      return;
    }

    // Create User
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccessMessage(true);

        // Send Verification Email
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            console.log("Verification email send");
        })



      })
      .catch((error) => {
        setSuccessMessage(false);
        setErrorMessage(error.message);
        console.log(errorMessage);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if(!email){
        alert("Provide Email")
    }else{
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert("Password Reset Email Send.")
        })
    }
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-8">
      <h3 className="text-3xl ml-4 font-bold">Sign Up now!</h3>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-xs absolute right-2 top-12"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <label onClick={handleForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" name="terms" className="checkbox" />
            <span className="label-text">Accept Our Terms and Conditions</span>
          </label>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-600">Sign Up is Successful.</p>
      )}
      <p className="m-2">Already have an account? Please <Link to={"/login"}>Login</Link></p>
    </div>
  );
};

export default SignUp;
