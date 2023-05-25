import { useCallback, useState } from 'react';
import { sendRequest } from 'src/utils/send-request';
import { ModalMessage } from 'src/components/modal-message';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

const authenticatedUser = JSON.parse(window.sessionStorage.getItem('user'));

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: authenticatedUser.name,
    lastName: authenticatedUser.lastname,
    email: authenticatedUser.email,
    phone: authenticatedUser.phone,
    state: 'los-angeles',
    country: 'USA'
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [requestWasSuccess, setRequestWasSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSuccess = (message, status) => {
        setSuccessMessage(message);
        setOpen(true);
        setRequestWasSuccess(status);
      };

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const updateUserResponse = await sendRequest(
          `http://localhost:8080/api/v1/users/${authenticatedUser.username}`,
          'PUT',
          JSON.stringify({
            username: authenticatedUser.username,
            name: values.firstName,
            lastname: values.lastName,
            email: values.email,
            phone: values.phone,
          }),
          true
        );

        if (updateUserResponse.ok) {
          handleSuccess('Your account details have been saved.', true);
        } else {
          const updateUserResponseError = await updateUserResponse.json();
          handleSuccess(`Failed to update account details:\n${updateUserResponseError.message}`, false);
        }
      } catch (error) {
        handleSuccess('An error occurred while updating account details.', false);
      }
    },
    [authenticatedUser.username, values.firstName, values.lastName, values.email, values.phone]
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardContent sx={{ pt: 2.5 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={1}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
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
          variant="contained">
            Save details
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
