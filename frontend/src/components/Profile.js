import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        fetchBookings(user);

        console.log(user);
        console.log(user.email);
      } else {
        // No user is signed in.
        setUser(null);
        setBookings([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchBookings = async (user) => {
    try {
      // Make a backend request to fetch user bookings
      const response = await fetch(`http://localhost:5000/get-user-bookings/${user.uid}/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const bookings = await response.json();
        setBookings(bookings);
      } else {
        console.error("Failed to fetch user bookings");
      }
    } catch (error) {
      console.error("Error fetching user bookings: " + error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      {user ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">Welcome, {user.displayName}!</h2>

          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">User Information</h3>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Booked Tickets</h3>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map((booking, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">{booking.title}</h4>
                        <p>Date: {booking.releaseDate}</p>
                        <p>Seat Number: {booking.seatNumber}</p>
                      </div>
                      <Link
                        to={`/movie-details/${booking.title}`}
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No booked tickets yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
