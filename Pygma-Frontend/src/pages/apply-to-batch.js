import React, { useState } from 'react';
import Head from 'next/head';
import ArrowSmallLeftIcon from '@heroicons/react/24/solid/ArrowSmallLeftIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import { Box, Button, Checkbox, Container, FormControlLabel,
         Grid, Paper, Radio, RadioGroup,
         Select, SvgIcon, styled, TextareaAutosize, TextField, Typography } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { countries } from 'country-cities';
import { useFormik } from 'formik';
import * as yup from 'yup';

const PADDING_TOP = -10;

const countryOptions = countries.all();

const BannerImage = styled('img')({
  width: '100%',
  height: '20rem',
  objectFit: 'cover',
});

const BannerOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '3rem',
  backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), ${theme.palette.background.default})`,
}));

const Link = styled('a')(({ theme }) => ({
  color: '#CCE700',
  margin: 1,
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme, error }) => ({
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

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '0.80rem',
  },
}));

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  country: yup.string().required('Country of Residence is required'),
  linkedIn: yup
    .string()
    .url('Invalid LinkedIn URL')
    .matches(/linkedin\.com/, 'Invalid LinkedIn URL')
    .required('LinkedIn URL is required'),
  gender: yup.string().required('Gender is required'),
  quickBio: yup
    .string()
    .required('Please write a quick bio')
    .min(100, 'Quick bio must be at least 100 characters'),
  topThreeSkills: yup
    .array()
    .min(1, 'Please select at least one skill.')
    .max(3, 'Please select up to three skills.'),
  topThreeExperiences: yup
    .array()
    .min(1, 'Please select at least one experience.')
    .max(3, 'Please select up to three experiences.'),
  startupName: yup
    .string()
    .required('Startup name is required'),
  startupWebsite: yup
    .string()
    .url('Invalid Website URL')
    .required('Website URL is required'),
  startupDemo: yup
    .string()
    .url('Invalid Demo URL')
    .required('Demo URL is required'),
  startupTime: yup
    .number()
    .required('Startup age is required')
    .typeError('Startup age must be a number')
    .positive('Startup age must be a positive number')
    .integer('Startup age must be an integer'),
  startupWhy: yup
    .string()
    .required('Please write your motivation')
    .min(100, 'Motivation must be at least 100 characters'),
  startupHowFar: yup
    .string()
    .required('Please select your progress'),
  startupFundraising: yup
    .string()
    .required('Please choose an option')
});

const Page = () => {
  const authenticatedUser = JSON.parse(window.sessionStorage.getItem('user'));
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      //Contact Info:
      firstName: authenticatedUser?.name || '',
      lastName: authenticatedUser?.lastname || '',
      email: authenticatedUser?.email|| '',
      country: authenticatedUser?.country|| '',
      linkedIn: '',
      gender: 'male',
      quickBio: '',
      topThreeSkills: [],
      topThreeExperiences: [],
      //Startup Info:
      startupName: '',
      startupWebsite: '',
      startupDemo: '',
      startupTime: '',
      startupWhy: '',
      startupHowFar: '',
      startupHowMuchRaised: '',
      startupFundraising: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const handleTopThreeSkillsChange = (selectedOptions) => {
    formik.setFieldValue('topThreeSkills', selectedOptions);
    formik.setFieldTouched('topThreeSkills', true);
  };

  const handleTopThreeExperiencesChange = (selectedOptions) => {
    formik.setFieldValue('topThreeExperiences', selectedOptions);
    formik.setFieldTouched('topThreeExperiences', true);
  };

  return (
    <>
      <Head>
        <title>Apply to batch | Pygma</title>
      </Head>
      <Box
        component="main"
        sx={{
          py: PADDING_TOP,
          marginTop: '-40px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'justify',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '100%',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <BannerImage src="/assets/banners/build-the-future-with-us.png" alt="Form cover" />
          <BannerOverlay />
        </Paper>
        <Container
          sx={{
            maxWidth: {
              xs: '100%',
              sm: '600px',
              md: '800px',
            },
          }}
        >
          {!showForm ? (
            <>
              <Typography variant="h4" component="h1" gutterBottom textAlign="justify">
                PY4 Application
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="justify">
                <strong>Join PY4, a 12-week acceleration program</strong> designed to help pre-seed companies looking to
                scale their business and prepare for fundraising. We look forward to reviewing your application.
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginY: '1rem' }}>
                <strong>*Our program starts on Summer, 2023.</strong>
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="justify">
                In case you have any questions,
                <Link
                  href="https://program.pygma.co/"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ color: '#CCE700' }}
                >
                  explore our program page
                </Link>
                .
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="justify" sx={{ marginY: '1rem' }}>
                <strong>Remember our criteria for application:</strong>
              </Typography>
              <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
                - You must be a tech startup founder in the ‘pre-seed’ stage.
              </Typography>
              <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
                - You must be working full-time on your startup.
              </Typography>
              <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
                - You must have an Intermediate-advanced command of English.
              </Typography>
              <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
                - There must be a team of founders, we encourage solo founders to find a co-founder first.
              </Typography>
              <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
                - Within the "founding members" there is a CTO or a technical co-founder (Preferably).
              </Typography>
              <Typography variant="body1" paragraph textAlign="justify" sx={{ marginY: '1rem' }}>
                - *Applications must be completed before submission, including the video and pitch deck.*
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="justify" marginTop="2rem">
                <strong>Do you understand the criteria to successfully apply to our program?</strong>
              </Typography>
              <Box display="flex" alignItems="center">
                <Checkbox
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                  sx={{ marginRight: '0.5rem' }}
                />
                <Typography variant="body1" sx={{ marginLeft: '0.5rem' }}>
                  Yes*
                </Typography>
              </Box>
              <Button
                variant="text"
                color="primary"
                size="small"
                disabled={!isCheckboxChecked}
                onClick={() => setShowForm(true)}
              >
                <Typography variant="body1" component="span">
                  Next
                </Typography>
                <SvgIcon fontSize="small" sx={{ marginLeft: 1 }}>
                  <ArrowSmallRightIcon />
                </SvgIcon>
              </Button>
            </>
          ) : (
          <>
            <Button
              variant="text"
              color="primary"
              size="small"
              disabled={!isCheckboxChecked}
              onClick={() => setShowForm(false)}
              sx={{
                padding: '2px 0px'
              }}
            >
              <SvgIcon fontSize="small" sx={{ marginRight: 1 }}>
                <ArrowSmallLeftIcon />
              </SvgIcon>
              <Typography variant="body1" component="span">
                  Back
                </Typography>
            </Button>
            <form onSubmit={handleFormSubmit}>
              {/******************/
              /***Contact Info***/
              /******************/}
              <Typography variant="h5" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                Tell us about you
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 5}}>
                Please share your contact info *
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    margin="normal"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    margin="normal"
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Country of Residence"
                    name="country"
                    fullWidth
                    margin="normal"
                    value={formik.values.country}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.country && formik.errors.country}
                    helperText={formik.touched.country && formik.errors.country}
                    select
                    SelectProps={{ native: true }}
                  >
                    {countryOptions.map((option) => (
                      <option key={option.isoCode} value={option.isoCode}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="LinkedIn Profile"
                    name="linkedIn"
                    fullWidth
                    margin="normal"
                    value={formik.values.linkedIn}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.linkedIn && formik.errors.linkedIn}
                    helperText={formik.touched.linkedIn && formik.errors.linkedIn}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Gender"
                    name="gender"
                    fullWidth
                    margin="normal"
                    value={formik.values.gender}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.gender && formik.errors.gender}
                    helperText={formik.touched.gender && formik.errors.gender}
                    select
                    SelectProps={{ native: true }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </TextField>
                </Grid>
              </Grid>
              <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 5}}>
                Please share a quick bio (professional background, highlights) *
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Quick Bio..."
                    label="Quick Bio"
                    name="quickBio"
                    fullWidth
                    margin="normal"
                    value={formik.values.quickBio}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.quickBio && formik.errors.quickBio}
                    helperText={formik.touched.quickBio && formik.errors.quickBio}
                  />
                  {formik.touched.quickBio && formik.errors.quickBio && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.quickBio}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/*******************************/
              /***Skills and Experience Info***/
              /********************************/}
              <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 4}}>
                Please select your top three skills
              </Typography>
              <Typography variant="body2" gutterBottom textAlign="justify" sx={{color: 'grey'}}>
                * You can only select up to 3 skills.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <GenericCheckbox
                    formik={formik}
                    fieldName='topThreeSkills'
                    options={[
                       'Business Development',
                       'Design',
                       'Finance',
                       'Growth/Marketing',
                       'Human Resources',
                       'Leadership',
                       'Legal',
                       'Operations',
                       'Product Management',
                       'Sales',
                       'Software/Web Development',
                       'Strategy',
                       'Other',
                     ]}
                    selectedOptions={formik.values.topThreeSkills}
                    onChange={handleTopThreeSkillsChange}
                    onBlur={formik.topThreeSkills}
                    error={formik.touched.topThreeSkills && formik.errors.topThreeSkills}
                  />
                  {formik.touched.topThreeSkills && formik.errors.topThreeSkills && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.topThreeSkills}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 5}}>
                On what industries do you have experience on?
              </Typography>
              <Typography variant="body2" gutterBottom textAlign="justify" sx={{color: 'grey'}}>
                * You can only select up to 3 experiences.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <GenericCheckbox
                    formik={formik}
                    fieldName='topThreeExperiences'
                    options={[
                     'Advertisement',
                     'Asset Management',
                     'Beauty',
                     'Blockchains / Crypto',
                     'E-commerce',
                     'Fashion',
                     'Finance',
                     'Gaming',
                     'Government / Politics',
                     'Hardware',
                     'Insurance',
                     'Logistics',
                     'Marketing',
                     'Mobility',
                     'Real Estate',
                     'Recruiting',
                     'Retail',
                     'Services',
                     'Software/Web Development',
                     'Social Media',
                     'Tourism',
                     'Venture',
                     'Web 3',
                     'Other',
                   ]}
                    selectedOptions={formik.values.topThreeExperiences}
                    onChange={handleTopThreeExperiencesChange}
                    onBlur={formik.topThreeExperiences}
                    error={formik.touched.topThreeExperiences && formik.errors.topThreeExperiences}
                  />
                  {formik.touched.topThreeExperiences && formik.errors.topThreeExperiences && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.topThreeExperiences}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Horizontal line */}
              <hr style={{ margin: '2rem 0' }} />
              {/******************/
              /***Business Info***/
              /*******************/}
              <Typography variant="h5" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                Let's talk about your business
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label= "What is the name of your startup?"
                    name="startupName"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupName && formik.errors.startupName}
                    helperText={formik.touched.startupName && formik.errors.startupName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Please share the website of your startup"
                    name="startupWebsite"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupWebsite}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupWebsite && formik.errors.startupWebsite}
                    helperText={formik.touched.startupWebsite && formik.errors.startupWebsite}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Please share a demo of your product"
                    placeholder="This demo could be a short explainer video..."
                    name="startupDemo"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupDemo}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupDemo && formik.errors.startupDemo}
                    helperText={formik.touched.startupDemo && formik.errors.startupDemo}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="How long have you been working on this?"
                    placeholder="Please just share the number of years."
                    name="startupTime"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={formik.values.startupTime}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupTime && formik.errors.startupTime}
                    helperText={formik.touched.startupTime && formik.errors.startupTime}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" gutterBottom textAlign="justify" sx={{marginLeft: 2}}>
                    Why are you working on your startup?
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="What's your motivation..."
                    label = ""
                    name="startupWhy"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupWhy}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupWhy && formik.errors.startupWhy}
                    helperText={formik.touched.startupWhy && formik.errors.startupWhy}
                  />
                  {formik.touched.startupWhy && formik.errors.startupWhy && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupWhy}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" gutterBottom textAlign="justify" sx={{marginLeft: 2}}>
                    How far along are you?
                  </Typography>
                  <StyledRadioGroup
                    name="startupHowFar"
                    marginTop= "none"
                    value={formik.values.startupHowFar}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="I'm working on an idea"
                      control={<Radio />}
                      label="I'm working on an idea"
                    />
                    <FormControlLabel
                      value="I have an MVP"
                      control={<Radio />}
                      label="I have an MVP"
                    />
                    <FormControlLabel
                      value="I have my first customers"
                      control={<Radio />}
                      label="I have my first customers"
                    />
                    <FormControlLabel
                      value="I have significant traction (users/sales/capital)"
                      control={<Radio />}
                      label="I have significant traction (users/sales/capital)"
                    />
                    <FormControlLabel
                      value="I have reached Product-Market Fit"
                      control={<Radio />}
                      label="I have reached Product-Market Fit"
                    />
                    <FormControlLabel
                      value="I'm at a growth stage"
                      control={<Radio />}
                      label="I'm at a growth stage"
                    />
                  </StyledRadioGroup>
                  {formik.touched.startupHowFar && formik.errors.startupHowFar && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupHowFar}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField
                    label="How much have you raised? (If applicable)"
                    name="startupHowMuchRaised"
                    fullWidth
                    margin="none"
                    value={formik.values.startupHowMuchRaised}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupHowMuchRaised && formik.errors.startupHowMuchRaised}
                    helperText={formik.touched.startupHowMuchRaised && formik.errors.startupHowMuchRaised}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ alignItems: 'center' }}>
                  <Typography variant="body2" gutterBottom sx={{ marginLeft: 2 }}>
                    Are you currently fundraising?
                  </Typography>
                  <StyledRadioGroup
                    name="startupFundraising"
                    margin="normal"
                    value={formik.values.startupFundraising}
                    onChange={formik.handleChange}
                    sx={{ display: 'flex'}}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      sx={{ fontSize: '0.80rem' }}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </StyledRadioGroup>
                  {formik.touched.startupFundraising && formik.errors.startupFundraising && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupFundraising}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Horizontal line */}
              <hr style={{ margin: '2rem 0' }} />
              {/******************/
              /***Why Info***/
              /*******************/}
              <Typography variant="h5" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                Your Startup Needs and Team Composition
              </Typography>
              <Grid container spacing={2}>
              {/*ADD YOUR CODE HERE*/}
              </Grid>



              <Button
                variant="text"
                color="primary"
                size="small"
                type="submit"
                disabled={!formik.isValid || !isCheckboxChecked}
              >
                <Typography variant="body1" component="span">
                  Submit
                </Typography>
                <SvgIcon fontSize="small" sx={{ margin: 1 }}>
                  <ArrowSmallRightIcon />
                </SvgIcon>
              </Button>
            </form>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
