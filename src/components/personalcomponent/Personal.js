import React, { useState, useEffect } from 'react';

const Personal = () => {
  const [post, setNames] = useState([]); // State to store fetched names

  useEffect(() => {
    // Function to fetch data from API
    const fetchNames = async () => {
      try {
        const response = await fetch('http://localhost:8080/app/post'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNames(data); // Assuming API returns an array of names
      } catch (error) {
        console.error('Failed to fetch names:', error);
      }
    };

    fetchNames();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      {post.map((post, index) => (
        <div key={index} style={{ color: 'blue' }}>
          {post}
        </div>
      ))}
    </div>
  );
};

export default Personal;