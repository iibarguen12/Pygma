import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import Head from 'next/head';
import ArrowSmallLeftIcon from '@heroicons/react/24/solid/ArrowSmallLeftIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowSmallRightIcon';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library'

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
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [openModalMessage, setOpenModalMessage] = useState(false);  
  const [isSuccessModalMessage, setIsSuccessModalMessage] = useState(false);
  const handleErrorOrSuccess = (message, isValid) => {
    setModalMessage(message);
    setIsSuccessModalMessage(isValid);
    setOpenModalMessage(true);
  };
  const [performPage1Validations, setPerformPage1Validations] = useState(false);
  const [performPage2Validations, setPerformPage2Validations] = useState(false);
  const [performPage3Validations, setPerformPage3Validations] = useState(false);
  const [performPage4Validations, setPerformPage4Validations] = useState(false);
  const [performPage5Validations, setPerformPage5Validations] = useState(false);
  const [performPage6Validations, setPerformPage6Validations] = useState(false);
  const [performPage7Validations, setPerformPage7Validations] = useState(false);
  const [performPage8Validations, setPerformPage8Validations] = useState(false);
  const [performPage9Validations, setPerformPage9Validations] = useState(false);
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

 const handleChangePage1Values = useCallback((values) => {
   setPage1Values(values);
 }, [page1Values]);

 const handleChangePage2Values = useCallback((values) => {
   setPage2Values(values);
 }, [page2Values]);

 const handleChangePage3Values = useCallback((values) => {
   setPage3Values(values);
 }, [page3Values]);

 const handleChangePage4Values = useCallback((values) => {
   setPage4Values(values);
 }, [page4Values]);

 const handleChangePage5Values = useCallback((values) => {
   setPage5Values(values);
 }, [page5Values]);

 const handleChangePage6Values = useCallback((values) => {
   setPage6Values(values);
 }, [page6Values]);

 const handleChangePage7Values = useCallback((values) => {
   setPage7Values(values);
 }, [page7Values]);

 const handleChangePage8Values = useCallback((values) => {
   setPage8Values(values);
 }, [page8Values]);

 const handleChangePage9Values = useCallback((values) => {
   setPage9Values(values);
 }, [page9Values]);

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
      .required('Please write your motivation'),
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

  const mapFormValuesToGoogleSheetValues = (inputValues) => {
    // Flatten the object and convert array values to strings
    const flattenNestedObjects = (object, parentKey = '') => {
      return Object.keys(object).reduce((result, key) => {
        const value = object[key];
        const nestedKey = parentKey ? `${parentKey}.${key}` : key;

        if (Array.isArray(value)) {
          // Convert array values to strings
          result[nestedKey] = value.join(', ');
        } else if (typeof value === 'object') {
          // Flatten nested objects
          Object.assign(result, flattenNestedObjects(value, nestedKey));
        } else {
          // Assign other values as-is
          result[nestedKey] = value;
        }

        return result;
      }, {});
    };

    return flattenNestedObjects(inputValues);
  };

  const appendToSpreadsheet = async (row) => {
    try {
      const auth = new JWT({
        email: process.env.NEXT_PUBLIC_GS_CLIENT_EMAIL,
        key: process.env.NEXT_PUBLIC_GS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GS_SPREADSHEET_ID, auth);

      await doc.loadInfo();

      const sheet = doc.sheetsById[process.env.NEXT_PUBLIC_GS_SHEET_ID];
      const result = await sheet.addRow(row);

      setLoadingSubmit(false);
      handleErrorOrSuccess('Application successfully sent!', true);
    } catch (e) {
      setLoadingSubmit(false);
      handleErrorOrSuccess("Error sending application: " + e , false);
    }
  };

  const handleFormSubmit = useCallback((event) => {
    const joinedFormValues = {
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

    setPerformPage1Validations(true);
    setPerformPage2Validations(true);
    setPerformPage3Validations(true);
    setPerformPage4Validations(true);
    setPerformPage5Validations(true);
    setPerformPage6Validations(true);
    setPerformPage7Validations(true);
    setPerformPage8Validations(true);
    setPerformPage9Validations(true);

    const isValid = true;

    validationSchema.validate(joinedFormValues, { abortEarly: false })
      .then((isValid) => {
        try{
          appendToSpreadsheet(mapFormValuesToGoogleSheetValues(joinedFormValues));
        }catch(error){
          setLoadingSubmit(false);
          handleErrorOrSuccess('Unexpected error happened: '+ error , !isValid);
        }
      })
      .catch((validationErrors) => {
        setLoadingSubmit(false);
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
                disabled={!isCheckboxChecked || loadingNext}
                onClick={async () => {
                  setLoadingNext(true);
                  await new Promise((resolve) => setTimeout(resolve, 1));
                  setShowForm(true);
                  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating an asynchronous action to show the spinner
                  setLoadingNext(false);
                }}
                sx={{ marginBottom: '3rem',marginTop: '1rem'  }}
              >
                <Typography variant="body1" component="span">
                  Next
                </Typography>
                {loadingNext ?
                <CircularProgress size={24} color="primary" sx={{ marginLeft: 1 }}/> :
                <SvgIcon fontSize="small" sx={{ marginLeft: 1 }}>
                  <ArrowSmallRightIcon />
                </SvgIcon>
                }
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
              <ApplyPage1 pageValues={page1Values} onChangePageValues={handleChangePage1Values} performValidation={performPage1Validations}/>
              <ApplyPage2 pageValues={page2Values} onChangePageValues={handleChangePage2Values} performValidation={performPage2Validations}/>
              <hr style={{ margin: '2rem 0' }} />
              <ApplyPage3 pageValues={page3Values} onChangePageValues={handleChangePage3Values} performValidation={performPage3Validations}/>
              <ApplyPage4 pageValues={page4Values} onChangePageValues={handleChangePage4Values} performValidation={performPage4Validations}/>
              <hr style={{marginTop:'3rem', marginBottom:'2rem' }} />
              <ApplyPage5 pageValues={page5Values} onChangePageValues={handleChangePage5Values} performValidation={performPage5Validations}/>
              <ApplyPage6 pageValues={page6Values} onChangePageValues={handleChangePage6Values} performValidation={performPage6Validations}/>
              <ApplyPage7 pageValues={page7Values} onChangePageValues={handleChangePage7Values} performValidation={performPage7Validations}/>
              <hr style={{ margin: '2rem 0' }} />
              <ApplyPage8 pageValues={page8Values} onChangePageValues={handleChangePage8Values} performValidation={performPage8Validations}/>
              <ApplyPage9 pageValues={page9Values} onChangePageValues={handleChangePage9Values} performValidation={performPage9Validations}/>
              <Button
                variant="text"
                color="primary"
                size="small"
                type="submit"
                disabled={loadingSubmit}
                onClick={async (event) => {
                   event.preventDefault();
                   setLoadingSubmit(true);
                   await new Promise((resolve) => setTimeout(resolve, 1));
                   handleFormSubmit(event);
                }}
                sx={{ marginBottom: '3rem',marginTop: '1rem'  }}
              >
                <Typography variant="body1" component="span">
                  Submit
                </Typography>
                {loadingSubmit ?
                  <CircularProgress size={24} color="primary" sx={{ marginLeft: 1 }}/> :
                  <SvgIcon fontSize="small" sx={{ margin: 1 }}>
                    <ArrowSmallRightIcon />
                  </SvgIcon>
                }
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
