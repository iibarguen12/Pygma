import { useTheme } from '@mui/material/styles';

export const WhiteLogo = () => {
  const theme = useTheme();
  const imageUrl = '/assets/logos/logo-pygma-p-white.png';

  return (
      <img
        src={imageUrl}
        alt="Logo"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
        }}
      />
    );
  };

export const BlackLogo = () => {
  const theme = useTheme();
  const imageUrl = '/assets/logos/logo-pygma-p-black.png';

  return (
      <img
        src={imageUrl}
        alt="Logo"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
        }}
      />
    );
  };
