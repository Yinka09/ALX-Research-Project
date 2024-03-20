import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Functional component for Contact section
export default function Contact({ listing }) {
  // State variables
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  // Function to handle message change
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Effect to fetch landlord information
  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);

  // Render component
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg "
            onChange={onChange}
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
