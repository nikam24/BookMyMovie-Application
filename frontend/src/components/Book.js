// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// export default function Book() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [authenticated, setAuthenticated] = useState(false);
//   const auth = getAuth();
//   const [loading, setLoading] = useState(true);
//   // const [theaterSeats, setTheaterSeats] = useState(
//   //   Array(50)
//   //     .fill()
//   //     .map((_, index) => ({
//   //       seatNumber: index + 1,
//   //       booked: false,
//   //       selected: false,
//   //     }))
//   // );
//   const [theaterSeats, setTheaterSeats] = useState([]);

//   const { title, releaseDate, imageUrl } = state ? state : {};

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if(user) {
//         setAuthenticated(true);
//       } else {
//         navigate("/login"); 
//       }
//     });

//     return () => unsubscribe();
//     }, [auth, navigate]);

//   useEffect(() => {
//     const fetchSeatMatrix = async () => {
//       try {
//         const response = await fetch(`/get-seat-matrix/${title}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setTheaterSeats(data.seatMatrix);
//           setLoading(false);
//           console.log(
//             "Fetched the seat Matrix from backend : " + data.seatMatrix
//           );
//         } else {
//           // If seat matrix not available, create a new one
//           const newSeatMatrix = Array(50)
//             .fill()
//             .map((_, index) => ({
//               seatNumber: index + 1,
//               booked: false,
//               selected: false,
//             }));

//           setTheaterSeats(newSeatMatrix);
//           setLoading(false);

//           // Save the new seat matrix to the database
//           await saveSeatMatrixToBackend(newSeatMatrix);
//         }
//       } catch (error) {
//         console.error("Error fetching seat matrix: " + error);
//       }
//     };

//     fetchSeatMatrix();
//   }, [title]);

//   const saveSeatMatrixToBackend = async (seatMatrix) => {
//     try {
//       await fetch("/save-seat-matrix", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, seatMatrix }),
//       });
//     } catch (error) {
//       console.error("Error saving seat matrix: " + error);
//     }
//   };

//   let amount = 1; // Amount in cents
//   let currency = "usd";

//   const [buttonState, setButtonState] = useState(true);

//   const handleSeatClick = (index) => {
//     if (theaterSeats[index].booked) {
//       alert("This seat is already booked");
//       return;
//     }
//     setButtonState(false);
//     let updatedSeats = [...theaterSeats];
//     updatedSeats[index].selected = !updatedSeats[index].selected;
//     setTheaterSeats(updatedSeats);
//   };

//   const handleConfirm = async (state) => {
//     if (buttonState === true) {
//       alert("Please select a seat");
//       return;
//     }
//     setButtonState(state);
//     let updatedSeats = [...theaterSeats];
//     const selectedSeats = updatedSeats
//       .filter((seat) => seat.selected)
//       .map((seat) => seat.seatNumber);
//     updatedSeats.forEach((seat) => {
//       if (seat.selected) {
//         seat.booked = true;
//         seat.selected = false;
//       }
//     });
//     setTheaterSeats(updatedSeats);
  
//     alert("Redirecting to payment....");
  
//     try {
//       console.log("Following are the selected Seats : " + selectedSeats);
//       alert("Wait");
  
//       const response = await fetch("/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount,
//           currency,
//           title,
//           releaseDate,
//           imageUrl,
//           userEmail: auth.currentUser.email,
//           selectedSeats,
//         }),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
  
//         window.location.href = data.url; // Redirect to the Stripe Checkout page
//       } else {
//         alert("Failed to initiate payment. Please try again late.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again later.");
//     }
//   };
  

//   return (
//     <>
//       {authenticated ? (
//         <div>
//           <div className="bg-red-400 h-14 m-2">
//             <h6 className="bg-yellow-400 text-black text-xl font-bold">
//               {title}
//             </h6>
//             <h3 className="font-semibold">{releaseDate}</h3>
//           </div>
//           {loading ? (
//             <> 
//               Loading...
//             </>
//           ):
//             <div className="grid grid-cols-10 gap-3 ml-4 mr-4 mt-44">
//               {theaterSeats.map((seat, index) => (
//                 <div key={index} className="outline-double">
//                   <span
//                     className={`flex items-center justify-center text-center hover:cursor-pointer ${
//                       seat.selected
//                         ? "bg-green-500"
//                         : seat.booked
//                         ? "bg-gray-300"
//                         : "bg-white"
//                     }`}
//                     onClick={() => handleSeatClick(index)}
//                   >
//                     {seat.seatNumber}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           }
//           <div className="flex justify-center mt-10">
//             <button
//               className={`${
//                 !buttonState ? "bg-green-500" : "bg-gray-300"
//               } bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
//               onClick={() => handleConfirm(!buttonState)}
//               disabled={buttonState}
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Book() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [theaterSeats, setTheaterSeats] = useState([]);
  const { title, releaseDate, imageUrl } = state ? state : {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchSeatMatrix = async () => {
      try {
        const response = await fetch(`/get-seat-matrix/${title}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTheaterSeats(data.seatMatrix);
          setLoading(false);
        } else {
          const newSeatMatrix = Array(50)
            .fill()
            .map((_, index) => ({
              seatNumber: index + 1,
              booked: false,
              selected: false,
            }));

          setTheaterSeats(newSeatMatrix);
          setLoading(false);

          await saveSeatMatrixToBackend(newSeatMatrix);
        }
      } catch (error) {
        console.error("Error fetching seat matrix: " + error);
      }
    };

    fetchSeatMatrix();
  }, [title]);

  const saveSeatMatrixToBackend = async (seatMatrix) => {
    try {
      await fetch("/save-seat-matrix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, seatMatrix }),
      });
    } catch (error) {
      console.error("Error saving seat matrix: " + error);
    }
  };

  let amount = 1; // Amount in cents
  let currency = "usd";

  const [buttonState, setButtonState] = useState(true);

  const handleSeatClick = (index) => {
    if (theaterSeats[index].booked) {
      alert("This seat is already booked");
      return;
    }
    setButtonState(false);
    let updatedSeats = [...theaterSeats];
    updatedSeats[index].selected = !updatedSeats[index].selected;
    setTheaterSeats(updatedSeats);
  };

  const handleConfirm = async (state) => {
    if (buttonState === true) {
      alert("Please select a seat");
      return;
    }
    setButtonState(state);
    let updatedSeats = [...theaterSeats];
    const selectedSeats = updatedSeats
      .filter((seat) => seat.selected)
      .map((seat) => seat.seatNumber);
    updatedSeats.forEach((seat) => {
      if (seat.selected) {
        seat.booked = true;
        seat.selected = false;
      }
    });
    setTheaterSeats(updatedSeats);

    alert("Redirecting to payment....");

    try {
      const response = await fetch("/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          title,
          releaseDate,
          imageUrl,
          userEmail: auth.currentUser.email,
          selectedSeats,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url; // Redirect to the Stripe Checkout page
      } else {
        alert("Failed to initiate payment. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {authenticated ? (
        <div className="bg-white p-8 rounded-md shadow-md max-w-lg w-full">
          <div className="bg-blue-500 text-white p-4 rounded-t-md">
            <h6 className="text-2xl font-bold">{title}</h6>
            <h3 className="font-semibold">{releaseDate}</h3>
          </div>
          {loading ? (
            <div className="text-center mt-4">Loading...</div>
          ) : (
            <div className="grid grid-cols-10 gap-4 mt-8">
              {theaterSeats.map((seat, index) => (
                <div key={index} className="outline-double">
                  <span
                    className={`flex items-center justify-center text-center cursor-pointer ${
                      seat.selected
                        ? "bg-green-500 text-white"
                        : seat.booked
                        ? "bg-gray-300 text-gray-700"
                        : "bg-white text-black"
                    } p-2 `}
                    onClick={() => handleSeatClick(index)}
                  >
                    {seat.seatNumber}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className=" mt-2 flex flex-col items-center justify-center">
            <img className=" " src="http://localhost:3000/movie-screen.png" alt="Movie-Screen"></img>
            <p className="text-center text-sm  -mt-8">All eyes this way please!</p>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className={`${
                !buttonState ? "bg-green-500" : "bg-gray-300"
              } hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleConfirm(!buttonState)}
              disabled={buttonState}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center justify-center mr-4">
          <div className="w-4 h-4 bg-white border border-gray-400 mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center justify-center mr-4">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-300 mr-2"></div>
          <span>Sold</span>
        </div>
      </div>
    </div>
  );
}

