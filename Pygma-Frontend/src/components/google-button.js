import { useContext, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from 'src/pages/_app';
import { Button } from '@mui/material';
import { memo } from 'react';

//TODO check error while login CORS
const StyledGoogleButton = memo(({ buttonText, handleGoogleSuccess, handleGoogleFailure }) => {
  const theme = useTheme();
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const renderButton = (renderProps) => (
    <Button
      fullWidth
      size="large"
      sx={
        currentTheme === 'dark'? {mt: 3, color: "black",
        '&:hover': { color: 'white' }}: {mt: 3,}
      }
      type="submit"
      variant="contained"
      onClick={renderProps.onClick}
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
    >
      {buttonText}
    </Button>
  );

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GS_CLIENT_ID}
      onSuccess={handleGoogleSuccess}
      onFailure={handleGoogleFailure}
      cookiePolicy={'single_host_origin'}
      render={renderButton}
    />
  );
});

export default StyledGoogleButton;
