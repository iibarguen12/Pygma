import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
import Select from 'react-select';
import { cities, countries } from 'country-cities';

export const AccountProfileDetails = () => {
  const authenticatedUser = JSON.parse(window.sessionStorage.getItem('user'));
  const [values, setValues] = useState({
    firstName: authenticatedUser?.name || '',
    lastName: authenticatedUser?.lastname || '',
    email: authenticatedUser?.email || '',
    phone: authenticatedUser?.phone || '',
    country: authenticatedUser?.country || '',
    city: authenticatedUser?.city || '',
  });
  const countryOptions = countries.all();
  const cityOptions = useMemo(() => {
    const citySet = new Set(cities.getByCountry(values.country).map(city => city.name));
    return Array.from(citySet);
  }, [values.country]);

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
            country: values.country,
            city: values.city
          }),
          true
        );

        if (updateUserResponse.ok) {
          handleSuccess('Your account details have been saved.', true);
          const userResponseData = await updateUserResponse.json();
          window.sessionStorage.setItem('user', JSON.stringify(userResponseData));
        } else {
          const updateUserResponseError = await updateUserResponse.json();
          handleSuccess(`Failed to update account details:\n${updateUserResponseError.message}`, false);
        }
      } catch (error) {
        handleSuccess('An error occurred while updating account details.', false);
      }
    },
    [authenticatedUser?.name || '', values.firstName, values.lastName, values.email, values.phone, values.country, values.city]
  );

  useEffect(() => {
    const newCityOptions = cities.getByCountry(values.country).map(city => city.name);
    setValues((prevState) => ({
      ...prevState,
      city: newCityOptions.includes(values.city) ? values.city : newCityOptions[0]
    }));
  }, [values.country]);

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, [requestWasSuccess]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardContent sx={{ pt: 2.5 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={1}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.country}
                >
                  {countryOptions.map((option) => (
                    <option key={option.isoCode} value={option.isoCode}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select City"
                  name="city"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.city}
                >
                  {cityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
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
            type="submit"
            variant="text"
          >
            Save details
          </Button>
        </CardActions>
      </Card>
      <ModalMessage
        open={open}
        message={successMessage}
        onClose={handleModalClose}
        success={requestWasSuccess}
      />
    </form>
  );
};
