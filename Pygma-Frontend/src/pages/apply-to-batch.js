import React, { useContext, useState, useMemo, useCallback } from 'react';
import Head from 'next/head';
import ArrowSmallLeftIcon from '@heroicons/react/24/solid/ArrowSmallLeftIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  SvgIcon,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import GenericCheckbox from 'src/components/generic-checkbox';
import { ThemeContext } from 'src/pages/_app';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StyledTextarea, StyledRadioGroup } from 'src/components/styled-components';
import ApplyPage0 from 'src/pages/apply-to-batch/apply-to-batch-page0';
import ApplyPage1 from 'src/pages/apply-to-batch/apply-to-batch-page1';
import ApplyPage2 from 'src/pages/apply-to-batch/apply-to-batch-page2';
import ApplyPage3 from 'src/pages/apply-to-batch/apply-to-batch-page3';
import ApplyPage4 from 'src/pages/apply-to-batch/apply-to-batch-page4';
import ApplyPage5 from 'src/pages/apply-to-batch/apply-to-batch-page5';
import ApplyPage6 from 'src/pages/apply-to-batch/apply-to-batch-page6';
import ApplyPage7 from 'src/pages/apply-to-batch/apply-to-batch-page7';
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

const Link = styled('a')(() => ({
  color: '#CCE700',
  margin: 1,
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
  startupName: yup.string().required('Startup name is required'),
  startupWebsite: yup
    .string()
    .url('Invalid Website URL')
    .required('Website URL is required'),
  startupDemo: yup.string().url('Invalid Demo URL').required('Demo URL is required'),
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
  startupHowFar: yup.string().required('Please select your progress'),
  startupFundraising: yup.string().required('Please select an option'),
  startupNeeds: yup
    .array()
    .min(1, 'Please select at least one option.')
    .max(2, 'Please select up to two options.'),
  startupExpectations: yup.string().required('Please share your expectations'),
  startupCoFounders: yup.string().required('Co-founders are required'),
  startupHowMeetCoFounders: yup
    .string()
    .required('Please tell us how you met them'),
  startupHowBigTeam: yup.string().required('Team length is required'),
  startupShortBlurb: yup.string().required('Please share a short blurb'),
  startupPurpose: yup.string().required('Please share your purpose'),
  startupIndustry: yup.string().required('Please select your industry'),
  startupHowBigMarket: yup.string().required('Please share your market'),
  startupUniqueMarketInsight: yup
    .string()
    .required('Please share your unique insight'),
  startupUnfairAdvantage: yup
    .string()
    .required('Please share your unfair advantage'),
  startupBusinessModel: yup.string().required('Please select a business model'),
  startupCustomerSegment: yup
    .array()
    .min(1, 'Please select at least one option.')
    .max(2, 'Please select up to two options.'),
  startupPeopleUsingProduct: yup
    .string()
    .required('Please select if people are using your product'),
  startupActiveUsers: yup.string().required('Please share your active users'),
  startupPayingUsers: yup.string().required('Please share your paying users'),
  startupFinanciallySustainable: yup
    .string()
    .required('Please select if your startup is financially sustainable'),
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
  startupLegalStructure: yup.string().required('Please select your legal structure'),
  startupLegalStructureDescription: yup
    .string()
    .required('Please describe your legal structure'),
  startupPitchDeck: yup
    .string()
    .url('Invalid Pitch Deck Link')
    .required('Please share your pitch deck'),
  startupVideo: yup.string().url('Invalid video Link').required('Please share a 2 minutes video'),
  whatConvincedYouToApply: yup.string().required('Please share your motivation'),
  someoneEncourageYouToApply: yup.string().required('Please select an option'),
  howDidYouHearAboutUs: yup
    .array()
    .min(1, 'Please select at least one option.')
    .max(7, 'Please select all that matches.'),
  confirmForm: yup.array().min(1, 'You have to check this to submit the form.'),
});

const Page = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  console.log("Theme="+ currentTheme);
  const isDarkTheme = (currentTheme=='dark') ? true : false;
  const authenticatedUser = useMemo(() => JSON.parse(window.sessionStorage.getItem('user')), []);
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

  const handleCheckboxChange = useCallback((event) => {
    setCheckboxChecked(event.target.checked);
  }, []);

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    formik.handleSubmit();
  }, [formik]);

  const handleTopThreeSkillsChange = useCallback((selectedOptions) => {
    formik.setFieldValue('topThreeSkills', selectedOptions);
    formik.setFieldTouched('topThreeSkills', true);
  }, [formik]);

  const handleTopThreeExperiencesChange = useCallback((selectedOptions) => {
    formik.setFieldValue('topThreeExperiences', selectedOptions);
    formik.setFieldTouched('topThreeExperiences', true);
  }, [formik]);

  const handleStartupNeeds = useCallback((selectedOptions) => {
    formik.setFieldValue('startupNeeds', selectedOptions);
    formik.setFieldTouched('startupNeeds', true);
  }, [formik]);

  const handleStartupCustomerSegment = useCallback((selectedOptions) => {
    formik.setFieldValue('startupCustomerSegment', selectedOptions);
    formik.setFieldTouched('startupCustomerSegment', true);
  }, [formik]);

  const handleHowDidYouHearAboutUs = useCallback((selectedOptions) => {
    formik.setFieldValue('howDidYouHearAboutUs', selectedOptions);
    formik.setFieldTouched('howDidYouHearAboutUs', true);
  }, [formik]);

  const handleConfirmForm = useCallback((selectedOptions) => {
    formik.setFieldValue('confirmForm', selectedOptions);
    formik.setFieldTouched('confirmForm', true);
  }, [formik]);

  const handleSliderStartupCoFounders = useCallback((event, value) => {
    formik.setFieldValue('startupCoFounders', value);
  }, [formik]);

  const handleSliderStartupHowBigTeam = useCallback((event, value) => {
    formik.setFieldValue('startupHowBigTeam', value);
  }, [formik]);

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
          <BannerImage
           src={isDarkTheme ? '/assets/banners/build-the-future-with-us-black.png' : '/assets/banners/build-the-future-with-us-white.png'}
           alt="Form cover" />
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
              {/*Initial page*/}
              <ApplyPage0
                isCheckboxChecked={isCheckboxChecked}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                  padding: '2px 0px',
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
              {/*Contact Info*/}
              <ApplyPage1 formik={formik} countryOptions={countryOptions} />
              {/*Skills and Experience Info*/}
              <ApplyPage2
                formik={formik}
                handleTopThreeSkillsChange={handleTopThreeSkillsChange}
                handleTopThreeExperiencesChange={handleTopThreeExperiencesChange}
              />
              <hr style={{ margin: '2rem 0' }} />
              {/*Business Info*/}
              <ApplyPage3 formik={formik} />
              <ApplyPage4
                formik={formik}
                handleStartupNeeds={handleStartupNeeds}
                handleSliderStartupCoFounders={handleSliderStartupCoFounders}
                handleSliderStartupHowBigTeam={handleSliderStartupHowBigTeam}
              />
              <hr style={{marginTop:'3rem', marginBottom:'2rem' }} />
              {/*Why Info*/}
              <ApplyPage5
                formik={formik}
                startupIndustryOptions={startupIndustryOptions}
                businessModelOptions={businessModelOptions}
              />
              <ApplyPage6
                formik={formik}
                handleStartupCustomerSegment={handleStartupCustomerSegment}
                legalStructureOptions={legalStructureOptions} />
              <hr style={{ margin: '2rem 0' }} />
              {/*Last Details*/}
              <ApplyPage7 formik={formik} />

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
