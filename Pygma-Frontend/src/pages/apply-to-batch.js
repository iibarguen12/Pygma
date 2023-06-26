import React, { useContext, useMemo, useState, useCallback } from 'react';
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
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  console.log("Theme="+ currentTheme);
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

  const [page9Values, setPageValues] = useState({
    someoneEncourageYouToApply: '',
    referralName: '',
    howDidYouHearAboutUs: [],
    confirmForm: [],
  });

  const handleChangeValues = useCallback((values, page) => {
    console.log('page:',page);
    console.log('values:',values);
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
  }, []);

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    console.log('page1Values:', page1Values);
    console.log('page2Values:', page2Values);
    console.log('page3Values:', page3Values);
    console.log('page4Values:', page4Values);
    console.log('page5Values:', page5Values);
    console.log('page6Values:', page6Values);
    console.log('page8Values:', page8Values);
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
                disabled={!isCheckboxChecked}
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
