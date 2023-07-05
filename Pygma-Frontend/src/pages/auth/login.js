import { useCallback, useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { EyeIcon, EyeSlashIcon   } from '@heroicons/react/24/solid';
import { ThemeContext } from 'src/pages/_app';
import { ModalMessage } from 'src/components/modal-message';
import GoogleSignDiv from 'src/components/google-button';
import jwt_decode from 'jwt-decode';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(true);
  const [method, setMethod] = useState('email');
  const [open, setOpen] = useState(false);
  const [loadingByEmail, setLoadingByEmail] = useState(false);
  const [loadingByGoogle, setLoadingByGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const toggleShowPassword = () => {
     setShowPassword((showPassword) => !showPassword);
  };
  const handleMessageModal = (message, isSuccess) => {
    setModalMessage(message);
    setIsSuccessMessage(isSuccess);
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      email: 'demo@pygma.com',
      password: 'pygma',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .max(255)
        .required('Email or Username is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      setLoadingByEmail(true);
      try {
        let errorMessage = await auth.signIn(values.email, values.password, false);
        if (errorMessage !== null){
          throw new Error(errorMessage);
        }
        router.replace('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        setLoadingByEmail(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const googleCallback = async (response) => {
    setLoadingByGoogle(true);
    event.preventDefault();
    const decodedToken = jwt_decode(response.credential);

    const googleUser = {
      username: decodedToken.given_name.replace(/\s+/g, ''),
      name: decodedToken.given_name,
      lastname: decodedToken.family_name,
      imageUrl: decodedToken.picture,
      email: decodedToken.email
    };

    try {
      let errorMessage = await auth.signIn(googleUser.email, 'None', true);
      if (errorMessage !== null){
        throw new Error(errorMessage);
      }
      router.replace('/');
    } catch (err) {
      handleMessageModal("Error: "+err.message, false);
      setLoadingByGoogle(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Login | Pygma
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
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
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Using Email"
                value="email"
              />
              <Tab
                label="Using Google"
                value="withGoogle"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address or Username"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    InputProps={{
                      endAdornment:
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => toggleShowPassword()}
                            edge="end"
                          >
                          <SvgIcon fontSize="small">
                            <EyeIcon />
                            {showPassword ? <EyeIcon />: <EyeSlashIcon />}
                          </SvgIcon>
                          </IconButton>
                        </InputAdornment>
                      ,
                    }}
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
                  {loadingByEmail ? <CircularProgress size={24} color="info"/> : 'Continue'}
                </Button>
              </form>
            )}
            {method === 'withGoogle' && (
                <>
                <GoogleSignDiv buttonType="signin" googleCallback={googleCallback}/>
                {loadingByGoogle ? <CircularProgress size={24} color="primary"/> : ''}
                </>
            )}
          </div>
        </Box>
      </Box>
      <ModalMessage
        open={open}
        message={modalMessage}
        onClose={() => setOpen(false)}
        success={isSuccessMessage}
      />
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
