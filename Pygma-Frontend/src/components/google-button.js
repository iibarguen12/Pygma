import { useEffect } from 'react';

const GoogleSignDiv = ({ buttonType }) => {
  useEffect(() => {
    // Load the Google GSI client script asynchronously
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  // Define the googleCallback function
  const googleCallback = (response) => {
    // Handle the Google Sign-In callback response
    console.log(response);
    // Perform further actions with the response as needed
  };

  // Conditionally assign the googleCallback function in the browser environment
  if (typeof window !== 'undefined') {
    window.googleCallback = googleCallback;
  }

  const buttonText = buttonType+"_with";

  return (
    <div
      id="g_id_onload"
      data-client_id={process.env.NEXT_PUBLIC_GS_CLIENT_ID}
      data-context={buttonType}
      data-ux_mode="popup"
      data-callback="googleCallback"
      data-auto_prompt="false"
    >
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_black"
        data-text={buttonText}
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};

export default GoogleSignDiv;
