import { useEffect, useRef, useState } from 'react';

const GoogleSignDiv = ({ buttonType, googleCallback }) => {
  const containerRef = useRef(null);
  const [, setForceUpdate] = useState(false);

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

  // Conditionally assign the googleCallback function in the browser environment
  if (typeof window !== 'undefined') {
    window.googleCallback = googleCallback;
  }

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = window.innerWidth >= 600 ? "400" : "350";
        containerRef.current.setAttribute("data-width", width);
        // Trigger a re-render by updating the state
        setForceUpdate((prev) => !prev);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const buttonText = `${buttonType}_with`;

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
        ref={containerRef}
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
