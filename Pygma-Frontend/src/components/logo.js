import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const imageUrl = '/assets/logos/logo-pygma-p.png';

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
