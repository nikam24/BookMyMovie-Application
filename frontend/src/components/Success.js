import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Success = () => {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const title = urlParams.get('title');
  const releaseDate = urlParams.get('releaseDate');
  const imageUrl = urlParams.get('imageUrl');
  const userEmail = urlParams.get('userEmail');
  const selectedSeats = urlParams.get('selectedSeats');

  useEffect(() => {
    const updateSeatMatrix = async () => {
      try {
        const response = await fetch('/success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            releaseDate: releaseDate,
            imageUrl: imageUrl,
            userEmail: userEmail,
            selectedSeats: selectedSeats,
          }),
        });

        if (response.ok) {
          console.log('Seat matrix updated successfully!');
        }
      } catch (error) {
        console.error('Error updating seat matrix: ' + error);
      }
    };

    updateSeatMatrix();
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="mb-4 w-full h-32 object-cover rounded-lg"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'contain',
          }}
        />
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{releaseDate}</p>
        <div className="mb-8">
          <p className="text-green-500 font-bold text-xl mb-2">
            Booking Successful!
          </p>
          <p className="text-gray-600">
            Thank you for booking. Your ticket details have been sent to{' '}
            {userEmail}.
          </p>
        </div>
        <Link
          to='/homepage'
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
