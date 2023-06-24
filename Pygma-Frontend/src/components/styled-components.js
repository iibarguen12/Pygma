import React from 'react';
import { styled, TextareaAutosize, RadioGroup } from '@mui/material';

export const StyledTextarea = styled(TextareaAutosize)(({ theme, error }) => ({
  backgroundColor: theme.palette.background.default,
  border: `${error ? `2px solid ${theme.palette.error.main}` : 'none'}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  padding: theme.spacing(2),
  width: '100%',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledRadioGroup = styled(RadioGroup)(() => ({
  '& .MuiTypography-root': {
    fontSize: '0.80rem',
  },
}));
