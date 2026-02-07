import React, { useEffect } from "react";
import Swal from "sweetalert2";

const baseurl = "https://rayanbackend-1.onrender.com/api/feature";

const WelcomePopup = () => {
  useEffect(() => {
    // Check if user already saw the popup
    const hasSeenPopup = localStorage.getItem("welcomePopupSeen");
    if (hasSeenPopup) return; // Don't show again

    Swal.fire({
      title: "Join our news letter!",
      input: "email",
      showCancelButton: true
    }).then(async (result) => {
      // Mark as seen in localStorage
      localStorage.setItem("welcomePopupSeen", "true");

      if (result.isConfirmed && result.value) {
        try {
          const response = await fetch(`${baseurl}/sendemail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: result.value })
          });

          if (!response.ok) {
            Swal.fire("Please try later");
          } else {
            Swal.fire("You Joined succesfully!");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Something went wrong");
        }
      }
    });
  }, []);

  return null;
};

export default WelcomePopup;
