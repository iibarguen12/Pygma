import { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { ModalMessage } from 'src/components/modal-message';
import { ThemeContext } from 'src/pages/_app';

const Page = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = useState(false);
  const handleSuccess = (message) => {
        setSuccessMessage(message);
        setOpen(true);
      };
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      lastname: '',
      email: '',
      submit: null
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(255)
        .required('Username is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      lastname: Yup
        .string()
        .max(255)
        .required('Lastname is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        let errorMessage = await auth.signUp(values.username, values.name, values.lastname, values.email);
        if (errorMessage !== null){
          throw new Error(errorMessage);
        }
        handleSuccess('Registration successful, please check your email account.', true);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Pygma
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={1}>
                <TextField
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="Username"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="First Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.lastname && formik.errors.lastname)}
                  fullWidth
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  label="Last Name"
                  name="lastname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={
                  currentTheme === 'dark'? {mt: 3, color: "black",
                  '&:hover': { color: 'white' }}: {mt: 3,}
                }
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
              <ModalMessage
                open={open}
                message={successMessage}
                onClose={() => setOpen(false)}
                success={true}
              />
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
