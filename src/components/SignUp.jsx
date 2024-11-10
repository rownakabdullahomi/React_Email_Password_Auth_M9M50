import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.init";
import { useState } from "react";

const SignUp = () => {

    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSignUp = (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        setErrorMessage("");
        setSuccessMessage(false)

        if(password.length < 6){
            setErrorMessage("Password must be 6 characters.");
            return;
        }

        const passwordRegex = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[\W_])).{6,}$/;

        if(!passwordRegex.test(password)){
            setErrorMessage("At least one number, one uppercase, one lowercase and one special character");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result);
            setSuccessMessage(true);
        })
        .catch(error => {
            setSuccessMessage(false);
            setErrorMessage(error.message);
            console.log(errorMessage);
            
        })
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
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>

        {
            errorMessage && <p className="text-red-600">{errorMessage}</p>
        }
        {
            successMessage && <p className="text-green-600">Sign Up is Successful.</p>
        }

    </div>
  );
};

export default SignUp;
