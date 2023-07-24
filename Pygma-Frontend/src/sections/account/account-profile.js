import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Typography
} from '@mui/material';
import { sendRequest } from 'src/utils/send-request';
import { ModalMessage } from 'src/components/modal-message';

export const AccountProfile = ({ user }) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [requestWasSuccess, setRequestWasSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadPicture = useCallback(async (file) => {
    setLoadingSave(true);
    await new Promise((resolve) => setTimeout(resolve, 1));

    const formData = new FormData();
    formData.append('image', file);
    try {
      const updateUserResponse = await sendRequest(
        `http://localhost:8080/api/v1/users/${user.username}/image`,
        'PUT',
        formData,
        true,
        'multipart/form-data'
      );

      if (updateUserResponse.ok) {
        handleMessage('Account image changed.', true);
        const userResponseData = await updateUserResponse.json();
        window.sessionStorage.setItem('user', JSON.stringify(userResponseData));
      } else {
        const updateUserResponseError = await updateUserResponse.json();
        handleMessage(`Failed to update account image:\n${updateUserResponseError.message}`, false);
      }
    } catch (error) {
      console.error('Failed to update account image:', error);
      handleMessage('Failed to update account image.', false);
    }
    setLoadingSave(false);
  }, [user.imageURL]);

  const handleButtonClick = () => {
    document.getElementById('upload-image').click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    handleUploadPicture(file);
  };

  const handleMessage = (message, status) => {
    setSuccessMessage(message);
    setOpen(true);
    setRequestWasSuccess(status);
  };

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [requestWasSuccess]);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={`${user.imageURL}?${Date.now()}`}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.username}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ pb: 3.7 }}
          >
            {user.city} {user?.country || '_'}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          type="file"
          onChange={handleImageChange}
        />
        <Button
          disabled={loadingSave}
          fullWidth
          variant="text"
          onClick={handleButtonClick}
        >
          {loadingSave ?
          <CircularProgress size={24} color="primary" sx={{ marginLeft: 1 }}/> :
          'Change picture'
          }
        </Button>
        <ModalMessage
          open={open}
          message={successMessage}
          onClose={handleModalClose}
          success={requestWasSuccess}
        />
      </CardActions>
    </Card>
  );
};
