import Home from "./Home";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

const HomePage = ( ) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setAuthenticated(true);
      } else {
        navigate("/login"); 
      }
    });

    return () => unsubscribe();
    }, [auth, navigate]);


  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
    }).catch((error) => {
      // An error happened.
      console.log("An error happened.");
    });
  }

  return (
    <div>
      { authenticated ? (
        <>
          <Navbar Logout={handleLogout} />
          <Home />
        </>
      ): null}
    </div>
  );
};

export default HomePage;
