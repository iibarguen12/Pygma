import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, indigoDark, info, neutral, neutralDark, success, warning } from './colors';

export function createPalette(mode) {
  const isLightMode = mode === 'light';

  return {
    action: {
      active: isLightMode ? neutral[500] : neutralDark[500],
      disabled: alpha(isLightMode ? neutral[900] : neutralDark[900], 0.38),
      disabledBackground: alpha(isLightMode ? neutral[900] : neutralDark[900], 0.12),
      focus: alpha(isLightMode ? neutral[900] : neutralDark[900], 0.16),
      hover: alpha(isLightMode ? neutral[900] : neutralDark[900], 0.04),
      selected: alpha(isLightMode ? neutral[900] : neutralDark[900], 0.12)
    },
    background: {
      default: isLightMode ? common.white : '#090909',
      paper: isLightMode ? common.white : '#000000'
    },
    divider: '#F2F4F7',
    error,
    info,
    mode,
    neutral: isLightMode ? neutral : neutralDark,
    primary: isLightMode ? indigo : indigoDark,
    success,
    text: {
      primary: isLightMode ? neutral[900] : neutralDark[900],
      secondary: isLightMode ? neutral[500] : neutralDark[500],
      disabled: alpha(isLightMode ? neutral[900] : neutralDark[900], 0.38)
    },
    warning
  };
}
