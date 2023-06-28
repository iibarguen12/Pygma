import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import Head from 'next/head';
import ArrowSmallLeftIcon from '@heroicons/react/24/solid/ArrowSmallLeftIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Paper,
  SvgIcon,
  styled,
  Typography,
} from '@mui/material';
import { ThemeContext } from 'src/pages/_app';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ModalMessage } from 'src/components/modal-message';
import ApplyPage0 from 'src/pages/apply-to-batch/apply-to-batch-page0';
import ApplyPage1 from 'src/pages/apply-to-batch/apply-to-batch-page1';
import ApplyPage2 from 'src/pages/apply-to-batch/apply-to-batch-page2';
import ApplyPage3 from 'src/pages/apply-to-batch/apply-to-batch-page3';
import ApplyPage4 from 'src/pages/apply-to-batch/apply-to-batch-page4';
import ApplyPage5 from 'src/pages/apply-to-batch/apply-to-batch-page5';
import ApplyPage6 from 'src/pages/apply-to-batch/apply-to-batch-page6';
import ApplyPage7 from 'src/pages/apply-to-batch/apply-to-batch-page7';
import ApplyPage8 from 'src/pages/apply-to-batch/apply-to-batch-page8';
import ApplyPage9 from 'src/pages/apply-to-batch/apply-to-batch-page9';
import * as yup from 'yup';

const PADDING_TOP = -10;

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

const Page = () => {
  const [modalMessage, setModalMessage] = useState('');
  const [openModalMessage, setOpenModalMessage] = useState(false);  
  const [isSuccessModalMessage, setIsSuccessModalMessage] = useState(false);
  const handleErrorOrSuccess = (message, isValid) => {
    setModalMessage(message);
    setIsSuccessModalMessage(isValid);
    setOpenModalMessage(true);
  };
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const isDarkTheme = (currentTheme=='dark') ? true : false;
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleCheckboxChange = useCallback((event) => {
    setCheckboxChecked(event.target.checked);
  }, []);

  const authenticatedUser = useMemo(() => JSON.parse(window.sessionStorage.getItem('user')), []);

  const [page1Values, setPage1Values] = useState({
    firstName: authenticatedUser?.name || '',
    lastName: authenticatedUser?.lastname || '',
    email: authenticatedUser?.email || '',
    country: authenticatedUser?.country || '',
    linkedIn: '',
    gender: 'male',
    quickBio: '',
  });

  const [page2Values, setPage2Values] = useState({
    topThreeSkills: [],
    topThreeExperiences: [],
  });

  const [page3Values, setPage3Values] = useState({
    startupName: '',
    startupWebsite: '',
    startupDemo: '',
    startupTime: '',
    startupWhy: '',
    startupHowFar: '',
    startupHowMuchRaised: '',
    startupFundraising: '',
  });

  const [page4Values, setPage4Values] = useState({
    startupNeeds: [],
    startupExpectations: '',
    startupCoFounders: '',
    startupHowMeetCoFounders: '',
    startupHowBigTeam: '',
  });

  const [page5Values, setPage5Values] = useState({
    startupShortBlurb: '',
    startupPurpose: '',
    startupIndustry: '',
    startupHowBigMarket: '',
    startupUniqueMarketInsight: '',
    startupUnfairAdvantage: '',
    startupBusinessModel: '',
  });

  const [page6Values, setPage6Values] = useState({
    startupCustomerSegment: [],
    startupPeopleUsingProduct: '',
    startupActiveUsers: '',
    startupPayingUsers: '',
    startupFinanciallySustainable: '',
    startupMakeMoneyPerMonth: '',
    startupSpendMoneyPerMonth: '',
  });

  const [page7Values, setPage7Values] = useState({
    startupBiggestChallenge: '',
    startupFormAnyLegalCompanyYet: '',
    startupLegalStructure: '',
    startupLegalStructureDescription: '',
  });

  const [page8Values, setPage8Values] = useState({
    startupPitchDeck: '',
    startupVideo: '',
    whatConvincedYouToApply: '',
  });

  const [page9Values, setPage9Values] = useState({
    someoneEncourageYouToApply: '',
    referralName: '',
    howDidYouHearAboutUs: [],
    confirmForm: [],
  });

  const handleChangeValues = useCallback((values, page) => {
    switch (page) {
      case 1:
        setPage1Values(values);
        break;
      case 2:
        setPage2Values(values);
        break;
      case 3:
        setPage3Values(values);
        break;
      case 4:
        setPage4Values(values);
        break;
      case 5:
        setPage5Values(values);
        break;
      case 6:
        setPage6Values(values);
        break;
      case 7:
        setPage7Values(values);
        break;
      case 8:
        setPage8Values(values);
        break;
      case 9:
        setPage9Values(values);
        break;
      default:
        break;
    }
  }, [page1Values, page2Values, page3Values, page4Values, page5Values, page6Values, page8Values, page9Values]);

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

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    const flattenFormValues = {
      ...page1Values,
      ...page2Values,
      ...page3Values,
      ...page4Values,
      ...page5Values,
      ...page6Values,
      ...page7Values,
      ...page8Values,
      ...page9Values,
    };

    const isValid = true;

    validationSchema.validate(flattenFormValues, { abortEarly: false })
      .then((isValid) => {
        console.log('Valid Form');
        handleErrorOrSuccess('Form successfully sent', isValid);
      })
      .catch((validationErrors) => {
        console.log('Form validation errors:', validationErrors.errors);
        let fieldsInError = validationErrors.inner.map(err => err.path);
        handleErrorOrSuccess('Some fields still need to be filled!' , !isValid);
      });
  }, [page1Values, page2Values, page3Values, page4Values, page5Values, page6Values, page8Values, page9Values]);

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
              <ApplyPage1 pageValues={page1Values} onChangePageValues={handleChangeValues}/>
              <ApplyPage2 pageValues={page2Values} onChangePageValues={handleChangeValues}/>
              <hr style={{ margin: '2rem 0' }} />
              <ApplyPage3 pageValues={page3Values} onChangePageValues={handleChangeValues}/>
              <ApplyPage4 pageValues={page4Values} onChangePageValues={handleChangeValues}/>
              <hr style={{marginTop:'3rem', marginBottom:'2rem' }} />
              <ApplyPage5 pageValues={page5Values} onChangePageValues={handleChangeValues}/>
              <ApplyPage6 pageValues={page6Values} onChangePageValues={handleChangeValues}/>
              <ApplyPage7 pageValues={page7Values} onChangePageValues={handleChangeValues}/>
              <hr style={{ margin: '2rem 0' }} />
              <ApplyPage8 pageValues={page8Values} onChangePageValues={handleChangeValues}/>
              <ApplyPage9 pageValues={page9Values} onChangePageValues={handleChangeValues}/>
              <Button
                variant="text"
                color="primary"
                size="small"
                type="submit"
              >
                <Typography variant="body1" component="span">
                  Submit
                </Typography>
                <SvgIcon fontSize="small" sx={{ margin: 1 }}>
                  <ArrowSmallRightIcon />
                </SvgIcon>
              </Button>
            </form>
            <ModalMessage
              open={openModalMessage}
              message={modalMessage}
              onClose={() => setOpenModalMessage(false)}
              success={isSuccessModalMessage}
            />
          </>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
