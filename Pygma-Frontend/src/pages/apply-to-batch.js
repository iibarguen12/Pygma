import React, { useState } from 'react';
import Head from 'next/head';
import ArrowSmallLeftIcon from '@heroicons/react/24/solid/ArrowSmallLeftIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import { Box, Button, Checkbox, Container, FormControlLabel,
         Grid, Paper, Radio, RadioGroup,
         Select, Slider, SvgIcon, styled, TextareaAutosize, TextField, Typography } from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { countries } from 'country-cities';
import { useFormik } from 'formik';
import * as yup from 'yup';

const PADDING_TOP = -10;

const countryOptions = countries.all();

const startupIndustryOptions = [
  { key: "Advertisement", value: "Advertisement" },
  { key: "Asset Management", value: "Asset Management" },
  { key: "Crypto / Blockchain", value: "Crypto / Blockchain" },
  { key: "E-commerce", value: "E-commerce" },
  { key: "Finance", value: "Finance" },
  { key: "Gaming", value: "Gaming" },
  { key: "Government / Politics", value: "Government / Politics" },
  { key: "Hardware", value: "Hardware" },
  { key: "Human Resources", value: "Human Resources" },
  { key: "Insurance", value: "Insurance" },
  { key: "Logistics", value: "Logistics" },
  { key: "Marketing", value: "Marketing" },
  { key: "Mobility", value: "Mobility" },
  { key: "Real Estate", value: "Real Estate" },
  { key: "Recruiting", value: "Recruiting" },
  { key: "Retail", value: "Retail" },
  { key: "Software / Web Development", value: "Software / Web Development" },
  { key: "Social Media", value: "Social Media" },
  { key: "Turism", value: "Turism" },
  { key: "Venture", value: "Venture" },
  { key: "Web 3", value: "Web 3" },
  { key: "Other*", value: "Other*" }
];

const businessModelOptions = [
  { key: "Ad-Based Model", value: "Ad-Based Model" },
  { key: "Broker", value: "Broker" },
  { key: "Direct sell", value: "Direct sell" },
  { key: "Enterprise", value: "Enterprise" },
  { key: "Freemium", value: "Freemium" },
  { key: "Marketplace", value: "Marketplace" },
  { key: "Membership", value: "Membership" },
  { key: "Reseller", value: "Reseller" },
  { key: "SaaS", value: "SaaS" },
  { key: "Service Model", value: "Service Model" },
  { key: "Subscription-Based Model", value: "Subscription-Based Model" },
  { key: "Transactional", value: "Transactional" },
  { key: "On-Demand", value: "On-Demand" },
  { key: "Usage-based model", value: "Usage-based model" },
];

const legalStructureOptions = [
  { key: "Untitled multiple choice field", value: "Untitled multiple choice field" },
  { key: "Local legal entity", value: "Local legal entity" },
  { key: "C-Corp", value: "C-Corp" },
  { key: "LLC", value: "LLC" },
  { key: "Cayman- Island Sandwich", value: "Cayman- Island Sandwich" },
  { key: "Other", value: "Other" },
  { key: "I don't have one yet", value: "I don't have one yet" },
];


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
    .required('Please select an option'),
  startupNeeds: yup
      .array()
      .min(1, 'Please select at least one option.')
      .max(2, 'Please select up to two option.'),
  startupExpectations: yup
      .string()
      .required('Please share your expectations'),
  startupCoFounders: yup
      .string()
      .required('Co-founders are required'),
  startupHowMeetCoFounders: yup
      .string()
      .required('Please tell us how you met them'),
  startupHowBigTeam: yup
      .string()
      .required('Team length is required'),
  startupShortBlurb: yup
      .string()
      .required('Please share a short blurb'),
  startupPurpose: yup
      .string()
      .required('Please share your purpose'),
  startupIndustry: yup
      .string()
      .required('Please select your industry'),
  startupHowBigMarket: yup
      .string()
      .required('Please share your market'),
  startupUniqueMarketInsight: yup
      .string()
      .required('Please share your unique insight'),
  startupUnfairAdvantage: yup
      .string()
      .required('Please share your unfair advantage'),
  startupBusinessModel: yup
      .string()
      .required('Please select a business model'),
  startupCustomerSegment: yup
      .array()
      .min(1, 'Please select at least one option.')
      .max(2, 'Please select up to two option.'),
  startupPeopleUsingProduct: yup
      .string()
      .required('Please select if the people are using your product'),
  startupActiveUsers: yup
      .string()
      .required('Please share your active users'),
  startupPayingUsers: yup
      .string()
      .required('Please share your paying users'),
  startupFinanciallySustainable: yup
      .string()
      .required('Please select if your startup is financially sustanable'),
  startupMakeMoneyPerMonth: yup
      .string()
      .required('Please share how much money you make per month'),
  startupSpendMoneyPerMonth: yup
      .string()
      .required('Please share how much money you spend per month'),
  startupBiggestChallenge: yup
      .string()
      .required('Please share your biggest challenge'),
  startupFormAnyLegalCompanyYet: yup
      .string()
      .required('Please select an option'),
  startupLegalStructure: yup
      .string()
      .required('Please select your legal structure'),
  startupLegalStructureDescription: yup
      .string()
      .required('Please describe your legal structure'),
  startupPitchDeck: yup
      .string()
      .url('Invalid Pitch Deck Link')
      .required('Please share your pitch deck'),
  startupVideo: yup
      .string()
      .url('Invalid video Link')
      .required('Please share a 2 minutes video'),
  whatConvincedYouToApply: yup
      .string()
      .required('Please share your motivation'),
  someoneEncourageYouToApply: yup
      .string()
      .required('Please select an option'),
  howDidYouHearAboutUs: yup
      .array()
      .min(1, 'Please select at least one option.')
      .max(7, 'Please select all that matches.'),
  confirmForm : yup
      .array()
      .min(1, 'You have to check this to submit the form.')

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
      startupNeeds: [],
      startupExpectations: '',
      startupCoFounders: '',
      startupHowMeetCoFounders: '',
      startupHowBigTeam: '',
      startupShortBlurb: '',
      startupPurpose: '',
      startupIndustry: '',
      startupHowBigMarket: '',
      startupUniqueMarketInsight: '',
      startupUnfairAdvantage: '',
      startupBusinessModel: '',
      startupCustomerSegment: [],
      startupPeopleUsingProduct: '',
      startupActiveUsers: '',
      startupPayingUsers: '',
      startupFinanciallySustainable: '',
      startupMakeMoneyPerMonth: '',
      startupSpendMoneyPerMonth: '',
      startupBiggestChallenge: '',
      startupFormAnyLegalCompanyYet: '',
      startupLegalStructure: '',
      startupLegalStructureDescription: '',
      startupPitchDeck: '',
      startupVideo: '',
      whatConvincedYouToApply: '',
      someoneEncourageYouToApply: '',
      referralName: '',
      howDidYouHearAboutUs: [],
      confirmForm: [],
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

  const handleStartupNeeds = (selectedOptions) => {
    formik.setFieldValue('startupNeeds', selectedOptions);
    formik.setFieldTouched('startupNeeds', true);
  };

  const handleStartupCustomerSegment = (selectedOptions) => {
      formik.setFieldValue('startupCustomerSegment', selectedOptions);
      formik.setFieldTouched('startupCustomerSegment', true);
    };

  const handleHowDidYouHearAboutUs = (selectedOptions) => {
    formik.setFieldValue('howDidYouHearAboutUs', selectedOptions);
    formik.setFieldTouched('howDidYouHearAboutUs', true);
  };

  const handleConfirmForm = (selectedOptions) => {
    formik.setFieldValue('confirmForm', selectedOptions);
    formik.setFieldTouched('confirmForm', true);
  };

  const handleSliderStartupCoFounders = (event, value) => {
    formik.setFieldValue('startupCoFounders', value);
  };

  const handleSliderStartupHowBigTeam = (event, value) => {
    formik.setFieldValue('startupHowBigTeam', value);
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
              <hr style={{ margin: '2rem 0' }} />
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
                    margin="normal"
                    value={formik.values.quickBio}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.quickBio && formik.errors.quickBio}
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
                    margin="normal"
                    value={formik.values.startupWhy}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupWhy && formik.errors.startupWhy}
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
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 5}}>
                    What do you need help with the most?
                  </Typography>
                  <Typography variant="body2" gutterBottom textAlign="justify" sx={{color: 'grey'}}>
                    * You can only select up to 3.
                  </Typography>
                  <GenericCheckbox
                    formik={formik}
                    fieldName='startupNeeds'
                    options={[
                     'Getting Product-Market fit',
                     'Fundraising for your Startup',
                     'Developing a Product Strategy',
                     'Developing a go-to market strategy',
                     'E-Growing the team',
                     'Getting support from our network',
                   ]}
                    selectedOptions={formik.values.startupNeeds}
                    onChange={handleStartupNeeds}
                    onBlur={formik.startupNeeds}
                    error={formik.touched.startupNeeds && formik.errors.startupNeeds}
                  />
                  {formik.touched.startupNeeds && formik.errors.startupNeeds && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupNeeds}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                    What are your expectations from Pygma?
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="What are you looking for..."
                    label = ""
                    name="startupExpectations"
                    margin="normal"
                    value={formik.values.startupExpectations}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupExpectations && formik.errors.startupExpectations}
                  />
                  {formik.touched.startupExpectations && formik.errors.startupExpectations && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupExpectations}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    How many co-founders are in your team (including yourself)?
                  </Typography>
                  <Typography variant="body2" gutterBottom textAlign="justify" color='grey' sx={{marginLeft: 2}}>
                    Remember you must have at least one co-founder, and preferably someone in your co-founder team, to take the CTO role. Max. 5 co-founders.
                  </Typography>
                  <Slider
                    onBlur={formik.handleBlur}
                    onChange={handleSliderStartupCoFounders}
                    error={formik.touched.startupCoFounders && formik.errors.startupCoFounders}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={[
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                    ]}
                    min={2}
                    max={5}
                  />
                  {formik.touched.startupCoFounders && formik.errors.startupCoFounders && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupCoFounders}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                    How did you meet your co-founders?
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Tell us your story..."
                    label = ""
                    name="startupHowMeetCoFounders"
                    margin="normal"
                    value={formik.values.startupHowMeetCoFounders}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupHowMeetCoFounders && formik.errors.startupHowMeetCoFounders}
                  />
                  {formik.touched.startupHowMeetCoFounders && formik.errors.startupHowMeetCoFounders && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupHowMeetCoFounders}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    How big is your team besides your co-founders?
                  </Typography>
                  <Typography variant="body2" gutterBottom textAlign="justify" color='grey' sx={{marginLeft: 2}}>
                    This could be employees, associates with little equity or advisors.
                  </Typography>
                  <Slider
                    onBlur={formik.handleBlur}
                    onChange={handleSliderStartupHowBigTeam}
                    error={formik.touched.startupHowBigTeam && formik.errors.startupHowBigTeam}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={[
                      { value: 1, label: '1-5' },
                      { value: 2, label: '5-10' },
                      { value: 3, label: 'More than 10' },
                    ]}
                    min={1}
                    max={3}
                  />
                  {formik.touched.startupHowBigTeam && formik.errors.startupHowBigTeam && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupHowBigTeam}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Horizontal line */}
              <hr style={{marginTop:'3rem', marginBottom:'2rem' }} />
              {/******************/
              /***Why Info***/
              /*******************/}
              <Typography variant="h5" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                Tell us more about your business
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                    Please share a short blurb (What your company does)
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Try to share this in 50 characters max."
                    label = ""
                    name="startupShortBlurb"
                    margin="normal"
                    value={formik.values.startupShortBlurb}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupShortBlurb && formik.errors.startupShortBlurb}
                  />
                  {formik.touched.startupShortBlurb && formik.errors.startupShortBlurb && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupShortBlurb}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    What is your company's purpose?
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="What do you want to achieve?"
                    label = ""
                    name="startupPurpose"
                    margin="normal"
                    value={formik.values.startupPurpose}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupPurpose && formik.errors.startupPurpose}
                  />
                  {formik.touched.startupPurpose && formik.errors.startupPurpose && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupPurpose}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    On what industry are you building your startup?
                  </Typography>
                  <TextField
                    name="startupIndustry"
                    fullWidth
                    margin="none"
                    size="small"
                    value={formik.values.startupIndustry}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupIndustry && formik.errors.startupIndustry}
                    helperText={formik.touched.startupIndustry && formik.errors.startupIndustry}
                    select
                    SelectProps={{ native: true }}
                  >
                    {startupIndustryOptions.map((option) => (
                      <option key={option.key} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                    How big is your market? (Opportunity)
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Ex: Our market has a TAM of #"
                    label = ""
                    name="startupHowBigMarket"
                    margin="normal"
                    value={formik.values.startupHowBigMarket}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupHowBigMarket && formik.errors.startupHowBigMarket}
                  />
                  {formik.touched.startupHowBigMarket && formik.errors.startupHowBigMarket && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupHowBigMarket}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    What unique insight do you have from your market/industry?
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Please share your unique insight"
                    label = ""
                    name="startupUniqueMarketInsight"
                    margin="normal"
                    value={formik.values.startupUniqueMarketInsight}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupUniqueMarketInsight && formik.errors.startupUniqueMarketInsight}
                  />
                  {formik.touched.startupUniqueMarketInsight && formik.errors.startupUniqueMarketInsight && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupUniqueMarketInsight}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    What is your unfair advantage? (Why are you the right team to build this?)
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Please share your unfair advantage"
                    label = ""
                    name="startupUnfairAdvantage"
                    margin="normal"
                    value={formik.values.startupUnfairAdvantage}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupUnfairAdvantage && formik.errors.startupUnfairAdvantage}
                  />
                  {formik.touched.startupUnfairAdvantage && formik.errors.startupUnfairAdvantage && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupUnfairAdvantage}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    What is your business model?
                  </Typography>
                  <TextField
                    name="startupBusinessModel"
                    fullWidth
                    margin="none"
                    size="small"
                    value={formik.values.startupBusinessModel}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupBusinessModel && formik.errors.startupBusinessModel}
                    helperText={formik.touched.startupBusinessModel && formik.errors.startupBusinessModel}
                    select
                    SelectProps={{ native: true }}
                  >
                    {businessModelOptions.map((option) => (
                      <option key={option.key} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 3}}>
                    What is your customer segment?
                  </Typography>
                  <Typography variant="body2" gutterBottom textAlign="justify" sx={{color: 'grey'}}>
                    * You can only select up to 2.
                  </Typography>
                  <GenericCheckbox
                    formik={formik}
                    fieldName='startupCustomerSegment'
                    options={[
                     'B2B',
                     'B2C',
                     'B2D',
                     'B2G',
                     'C2C',
                     'B2B2C',
                     'Other',
                   ]}
                    selectedOptions={formik.values.startupCustomerSegment}
                    onChange={handleStartupCustomerSegment}
                    onBlur={formik.startupCustomerSegment}
                    error={formik.touched.startupCustomerSegment && formik.errors.startupCustomerSegment}
                  />
                  {formik.touched.startupCustomerSegment && formik.errors.startupCustomerSegment && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupCustomerSegment}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ alignItems: 'center' }}>
                  <Typography variant="body1" gutterBottom sx={{marginTop: 3}}>
                    Are people using your product?
                  </Typography>
                  <StyledRadioGroup
                    name="startupPeopleUsingProduct"
                    margin="normal"
                    value={formik.values.startupPeopleUsingProduct}
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
                  {formik.touched.startupPeopleUsingProduct && formik.errors.startupPeopleUsingProduct && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupPeopleUsingProduct}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ alignItems: 'center' }}>
                  <Typography variant="body1" gutterBottom sx={{marginTop: 3}}>
                    Are you financially sustainable?
                  </Typography>
                  <StyledRadioGroup
                    name="startupFinanciallySustainable"
                    margin="normal"
                    value={formik.values.startupFinanciallySustainable}
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
                  {formik.touched.startupFinanciallySustainable && formik.errors.startupFinanciallySustainable && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupFinanciallySustainable}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label= "How many active users do you have?"
                    name="startupActiveUsers"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupActiveUsers}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupActiveUsers && formik.errors.startupActiveUsers}
                    helperText={formik.touched.startupActiveUsers && formik.errors.startupActiveUsers}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="How many paying users do you have?"
                    name="startupPayingUsers"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupPayingUsers}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupPayingUsers && formik.errors.startupPayingUsers}
                    helperText={formik.touched.startupPayingUsers && formik.errors.startupPayingUsers}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label= "How much money do you make per month?"
                    name="startupMakeMoneyPerMonth"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupMakeMoneyPerMonth}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupMakeMoneyPerMonth && formik.errors.startupMakeMoneyPerMonth}
                    helperText={formik.touched.startupMakeMoneyPerMonth && formik.errors.startupMakeMoneyPerMonth}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="How much money do you spend per month?"
                    name="startupSpendMoneyPerMonth"
                    fullWidth
                    margin="normal"
                    value={formik.values.startupPayingUsers}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupSpendMoneyPerMonth && formik.errors.startupSpendMoneyPerMonth}
                    helperText={formik.touched.startupSpendMoneyPerMonth && formik.errors.startupSpendMoneyPerMonth}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    Biggest challenge about your business model?
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Please share your biggest challenge"
                    label = ""
                    name="startupBiggestChallenge"
                    margin="normal"
                    value={formik.values.startupBiggestChallenge}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupBiggestChallenge && formik.errors.startupBiggestChallenge}
                  />
                  {formik.touched.startupBiggestChallenge && formik.errors.startupBiggestChallenge && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupBiggestChallenge}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} sx={{ alignItems: 'center' }}>
                  <Typography variant="body1" gutterBottom sx={{marginTop: 3}}>
                    Have you incorporate or form any legal company yet?
                  </Typography>
                  <StyledRadioGroup
                    name="startupFormAnyLegalCompanyYet"
                    margin="normal"
                    value={formik.values.startupFormAnyLegalCompanyYet}
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
                  {formik.touched.startupFormAnyLegalCompanyYet && formik.errors.startupFormAnyLegalCompanyYet && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupFormAnyLegalCompanyYet}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    What is the legal structure of your company?
                  </Typography>
                  <TextField
                    name="startupLegalStructure"
                    fullWidth
                    margin="none"
                    size="small"
                    value={formik.values.startupLegalStructure}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupLegalStructure && formik.errors.startupLegalStructure}
                    helperText={formik.touched.startupLegalStructure && formik.errors.startupLegalStructure}
                    select
                    SelectProps={{ native: true }}
                  >
                    {legalStructureOptions.map((option) => (
                      <option key={option.key} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    Please describe the legal structure of your company:
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="1)Who is in your cap table? 2)Where are you incorporated? 3)Any other relevant details."
                    label = ""
                    name="startupLegalStructureDescription"
                    margin="normal"
                    value={formik.values.startupLegalStructureDescription}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupLegalStructureDescription && formik.errors.startupLegalStructureDescription}
                  />
                  {formik.touched.startupBiggestChallenge && formik.errors.startupLegalStructureDescription && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.startupLegalStructureDescription}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* Horizontal line */}
              <hr style={{ margin: '2rem 0' }} />
              {/******************/
              /***Last Details***/
              /*******************/}
              <Typography variant="h5" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                Share the last details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                    Share a pitch deck of your company
                  </Typography>
                  <Typography variant="body2" gutterBottom textAlign="justify" color='grey'>
                    Please share your pitch deck by using a platform such as DocSend, BriefLink, Google Drive or equivalent.
                  </Typography>
                  <TextField
                    name="startupPitchDeck"
                    placeholder="..."
                    fullWidth
                    margin="none"
                    value={formik.values.startupPitchDeck}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupPitchDeck && formik.errors.startupPitchDeck}
                    helperText={formik.touched.startupPitchDeck && formik.errors.startupPitchDeck}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                    Upload a 2 minute video
                  </Typography>
                  <Typography variant="body2" gutterBottom textAlign="justify" color='grey'>
                    Please send a 2 min. video over a YouTube (delisted), Loom, or comparable; where you and your co-founder(s) cover the following:
                    </Typography>
                    <Typography variant="body2" gutterBottom textAlign="justify" color='grey'>
                    - Short intro of you and your experience
                    </Typography>
                    <Typography variant="body2" gutterBottom textAlign="justify" color='grey'>
                    - Short pitch about your startup
                    </Typography>
                    <Typography variant="body2" gutterBottom textAlign="justify" color='grey'>
                    - Why are you excited to build this?
                    </Typography>
                    <Typography variant="body2" gutterBottom textAlign="justify" color='grey'>
                    - Why are you excited to join Pygma?
                    </Typography>
                    <Typography variant="body2" gutterBottom textAlign="justify" color='grey'>
                    *Make sure you stay within the 2 min.
                  </Typography>
                  <TextField
                    name="startupVideo"
                    placeholder="..."
                    fullWidth
                    margin="none"
                    value={formik.values.startupVideo}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.startupVideo && formik.errors.startupVideo}
                    helperText={formik.touched.startupVideo && formik.errors.startupVideo}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 1}}>
                    What convinced you to apply to Pygma?
                  </Typography>
                  <StyledTextarea
                    minRows={4}
                    placeholder="Please share your motivation"
                    label = ""
                    name="whatConvincedYouToApply"
                    margin="normal"
                    value={formik.values.whatConvincedYouToApply}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.whatConvincedYouToApply && formik.errors.whatConvincedYouToApply}
                  />
                  {formik.touched.whatConvincedYouToApply && formik.errors.whatConvincedYouToApply && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.whatConvincedYouToApply}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} sx={{ alignItems: 'center' }}>
                  <Typography variant="body1" gutterBottom sx={{marginTop: 3}}>
                    Did someone encourage you to apply?
                  </Typography>
                  <StyledRadioGroup
                    name="someoneEncourageYouToApply"
                    margin="normal"
                    value={formik.values.someoneEncourageYouToApply}
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
                  {formik.touched.someoneEncourageYouToApply && formik.errors.someoneEncourageYouToApply && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.someoneEncourageYouToApply}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 2}}>
                    If a Pygma Alumni or someone from our network referred you, please share their name
                  </Typography>
                  <TextField
                    name="referralName"
                    placeholder="..."
                    fullWidth
                    margin="none"
                    value={formik.values.referralName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.referralName && formik.errors.referralName}
                    helperText={formik.touched.referralName && formik.errors.referralName}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" gutterBottom textAlign="justify" sx={{marginTop: 3}}>
                    How did you hear about us?
                  </Typography>
                  <Typography variant="body2" gutterBottom textAlign="justify" sx={{color: 'grey'}}>
                    * Select all that matches.
                  </Typography>
                  <GenericCheckbox
                    formik={formik}
                    fieldName='howDidYouHearAboutUs'
                    options={[
                     'Referred by someone',
                     'LinkedIn',
                     'Instagram',
                     'Facebook',
                     'Twitter',
                     'Company website',
                     'Other',
                   ]}
                    selectedOptions={formik.values.howDidYouHearAboutUs}
                    onChange={handleHowDidYouHearAboutUs}
                    onBlur={formik.howDidYouHearAboutUs}
                    error={formik.touched.howDidYouHearAboutUs && formik.errors.howDidYouHearAboutUs}
                  />
                  {formik.touched.howDidYouHearAboutUs && formik.errors.howDidYouHearAboutUs && (
                    <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                      {formik.errors.howDidYouHearAboutUs}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Typography variant="body1" gutterBottom textAlign="justify" marginTop="2rem">
                <strong>Confirm your submission</strong>
              </Typography>
              <Typography variant="body2" gutterBottom textAlign="justify" sx={{color: 'grey'}}>
                * I have completed this form truthfully, and I have reviewed all of the information I shared
              </Typography>
              <Grid item xs={12} sm={12}>
                <GenericCheckbox
                  formik={formik}
                  fieldName='confirmForm'
                  options={[
                   'Yes',
                 ]}
                  selectedOptions={formik.values.confirmForm}
                  onChange={handleConfirmForm}
                  onBlur={formik.confirmForm}
                  error={formik.touched.confirmForm && formik.errors.confirmForm}
                />
                {formik.touched.confirmForm && formik.errors.confirmForm && (
                  <Typography variant="caption" color="error" sx={{marginLeft: 2}}>
                    {formik.errors.confirmForm}
                  </Typography>
                )}
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
