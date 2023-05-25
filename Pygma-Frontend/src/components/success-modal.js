import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3);
  padding: 32px;
  width: 400px;
`;

const SuccessMessage = styled(Typography)`
  color: #CCE700;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

export function SuccessModal ({ open, message, onClose }) {
  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContainer>
        <SuccessMessage variant="body1">
          {message}
        </SuccessMessage>
        <Button
        sx={{
              backgroundColor: '#000000',
              '&:hover': {
                backgroundColor: '#c7e200', // TODO move this style to a global Button component
              },
            }}
        variant="contained" onClick={onClose}>
          Close
        </Button>
      </ModalContainer>
    </StyledModal>
  );
};

export default SuccessModal;
