import "./LoginButton.css";
import { useAuth0 } from "@auth0/auth0-react";
import login from "../loginbtn.png";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading login details...</p>;
  }

  if (isAuthenticated) {
    return (
      <button
        className="btn-login"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <img src={login} alt="" className="login" />
      </button>
    );
  }

  return (
    <button className="btn-login" onClick={() => loginWithRedirect()}>
      <img src={login} alt="" className="login" />
    </button>
  );
};

export default LoginButton;
