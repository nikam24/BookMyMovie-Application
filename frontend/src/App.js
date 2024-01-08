import Login from './auth/Login';
import Register from './auth/Register';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config/firebase';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Book from './components/Book';
import Profile from './components/Profile';
import CheckoutForm from './components/CheckoutForm';
import Success from './components/Success';
import Cancel from './components/Cancel';


const App = () => {  
  // const [auth, setAuth] = useState(null);
  
  // useEffect(() => {
  //   // Initialize the Firebase SDK
  //   initializeApp(firebaseConfig);

  //   // Get the Firebase authentication instance
  //   setAuth(getAuth());
  // }, []);

  async function initFirebase() {
    await initializeApp(firebaseConfig);
  }

  initFirebase();

  // Get the Firebase authentication instance
  const auth = getAuth();

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Register auth={auth} />} />
        <Route path='/login' element={<Login auth={auth} />} />
        <Route exact path='/homepage' element={<Homepage auth={auth} />} />
        <Route exact path='/book' element={<Book auth={auth} />} />
        <Route exact path='/profile' element={<Profile auth={auth} />} />
        <Route exact path='/payment' element={<CheckoutForm auth={auth} />} />
        <Route exact path='/success' element={<Success auth={auth} />} />
        <Route exact path='/cancel' element={<Cancel auth={auth} />} />
      </Routes>
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import Login from './auth/Login';
// import Register from './auth/Register';
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { firebaseConfig } from './config/firebase';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Homepage from './components/Homepage';
// import Profile from './components/Profile';
// import LoginAlert from './components/LoginAlert'; // Import the LoginAlert component

// const App = () => {
//   // Initialize Firebase app
//   useEffect(() => {
//     initializeApp(firebaseConfig);
//   }, []);

//   // Get the Firebase authentication instance
//   const auth = getAuth();

//   const [user, setUser] = useState(null);

//   // Check if the user is authenticated
//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         // User is signed in
//         setUser(currentUser);
//       } else {
//         // No user is signed in
//         setUser(null);
//       }
//     });
//   }, [auth]);

//   return (
//     <div>
//       <Routes>
//         <Route
//           path="/"
//           element={user ? <Navigate to="/homepage" /> : <Navigate to="/login" />}
//         />
//         <Route path="/login" element={<Login auth={auth} />} />
//         <Route
//           path="/homepage"
//           element={<PrivateRoute user={user} component={<Homepage />} />}
//         />
//         <Route
//           path="/profile"
//           element={
//             user ? (
//               <Profile />
//             ) : (
//               <>
//                 <LoginAlert />
//                 <Navigate to="/login" />
//               </>
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// // PrivateRoute component to protect routes
// function PrivateRoute({ element, user }) {
//   return user ? element : <Navigate to="/login" />;
// }

// export default App;


