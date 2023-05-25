import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sendRequest } from 'src/utils/send-request';
import { ModalMessage } from 'src/components/modal-message';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
});



export const SettingsPassword = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [requestWasSuccess, setRequestWasSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword:'',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const requestBody = {
          currentPassword: values.currentPassword,
          newPassword: values.confirmPassword
        };

        const updatePasswordResponse = await sendRequest(
          'http://localhost:8080/api/v1/auth/password',
          'PUT',
          JSON.stringify(requestBody),
          true
        );

        if (updatePasswordResponse.ok) {
          handleSuccess('Password updated successfully.', true);
        } else {
          const updatePasswordResponseError = await updatePasswordResponse.json();
          handleSuccess(`Failed to update password:\n${updatePasswordResponseError.message}`, false);
        }
      } catch (error) {
        handleSuccess('An error occurred while updating the password.', false);
      }
    }
  });

  const handleSuccess = useCallback((message, status) => {
    setSuccessMessage(message);
    setOpen(true);
    setRequestWasSuccess(status);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
          	<Grid item xs={12}>
          	  <TextField
          		fullWidth
          		label="Current Password"
          		name="currentPassword"
          		onChange={formik.handleChange}
				onBlur={formik.handleBlur}
          		type="password"
          		value={formik.values.currentPassword}
          		error={formik.touched.currentPassword && formik.errors.currentPassword}
          		helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          	  />
          	</Grid>
          	<Grid item xs={6}>
          	  <TextField
          		fullWidth
          		label="New Password"
          		name="newPassword"
          		onChange={formik.handleChange}
				onBlur={formik.handleBlur}
          		type="password"
          		value={formik.values.newPassword}
          		error={formik.touched.newPassword && formik.errors.newPassword}
          		helperText={formik.touched.newPassword && formik.errors.newPassword}
          	  />
          	</Grid>
          	<Grid item xs={6}>
          	  <TextField
          		fullWidth
          		label="Confirm Password"
          		name="confirmPassword"
          		onChange={formik.handleChange}
				onBlur={formik.handleBlur}
          		type="password"
          		value={formik.values.confirmPassword}
          		error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          		helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          	  />
          	</Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            sx={{
              backgroundColor: '#000000',
              '&:hover': {
                backgroundColor: '#c7e200', // TODO move this style to a global Button component
              },
            }}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </CardActions>
      </Card>
      <ModalMessage
        open={open}
        message={successMessage}
        onClose={() => setOpen(false)}
        success={requestWasSuccess}
      />
    </form>
  );
};
