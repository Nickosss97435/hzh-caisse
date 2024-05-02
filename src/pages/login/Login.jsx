import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
      
      <form onSubmit={handleLogin}>
      <h1>Connectez-vous</h1>
        <input
          type="email"
          placeholder="email"
          autoComplete="current-username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="mot de passe"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className=" btn btn-dark" type="submit">Se connecter</button>
        {error && <span>Mauvais email ou mot de passe !</span>}
      </form>
    </div>
  );
};

export default Login;
