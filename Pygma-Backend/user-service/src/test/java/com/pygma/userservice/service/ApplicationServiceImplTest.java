package com.pygma.userservice.service;

import com.pygma.userservice.entity.Application;
import com.pygma.userservice.entity.User;
import com.pygma.userservice.exception.InvalidDataException;
import com.pygma.userservice.exception.NotFoundException;
import com.pygma.userservice.model.ApplicationStatus;
import com.pygma.userservice.repository.ApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ApplicationServiceImplTest {

    @Mock
    private UserService userService;

    @Mock
    private ApplicationRepository applicationRepository;

    @InjectMocks
    private ApplicationServiceImpl applicationService;

    private User testUser;
    private Application testApplication;

    @BeforeEach
    public void setUp() {
        testUser = new User();
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");

        testApplication = new Application();
        testApplication.setId(1L);
        testApplication.setData(getCompletedTestData());
        testApplication.setUsername(testUser.getUsername());

    }

    @Test
    public void testFindApplicationByUsername() {
        when(userService.findUserByUsername("testUser")).thenReturn(testUser);
        when(applicationRepository.findApplicationByUsernameIgnoreCase(testUser.getUsername()))
                .thenReturn(Optional.of(testApplication));

        Application foundApplication = applicationService.findApplicationByUsername("testUser");

        assertNotNull(foundApplication);
        assertEquals(testApplication.getId(), foundApplication.getId());
        assertEquals(testApplication.getData(), foundApplication.getData());
    }

    @Test
    public void testFindApplicationByUsername_UserNotFound() {
        when(userService.findUserByUsername("testUser")).thenThrow(new NotFoundException("User not found"));

        assertThrows(NotFoundException.class, () -> applicationService.findApplicationByUsername("testUser"));
    }

    @Test
    public void testFindApplicationByUsername_ApplicationNotFound() {
        when(userService.findUserByUsername("testUser")).thenReturn(testUser);
        when(applicationRepository.findApplicationByUsernameIgnoreCase(testUser.getUsername()))
                .thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> applicationService.findApplicationByUsername("testUser"));
    }

    @Test
    public void testGetApplications() {
        List<Application> expectedApplications = Collections.singletonList(testApplication);
        when(applicationRepository.findAll()).thenReturn(expectedApplications);

        List<Application> applications = applicationService.getApplications();

        assertEquals(expectedApplications.size(), applications.size());
        assertEquals(expectedApplications.get(0).getId(), applications.get(0).getId());
        assertEquals(expectedApplications.get(0).getData(), applications.get(0).getData());
    }

    @Test
    public void testSaveApplication_ApplicationCompleted() {
        testApplication.setData(getCompletedTestData());
        when(applicationRepository.save(any())).thenReturn(testApplication);

        Application savedApplication = applicationService.saveApplication(testApplication);

        assertNotNull(savedApplication);
        assertEquals(ApplicationStatus.COMPLETED.name(), savedApplication.getStatus());
    }

    @Test
    public void testSaveApplication_ApplicationInProgress() {
        testApplication.setData(getIncompleteTestData());
        when(applicationRepository.save(any())).thenReturn(testApplication);

        Application savedApplication = applicationService.saveApplication(testApplication);

        assertNotNull(savedApplication);
        assertEquals(ApplicationStatus.IN_PROGRESS.name(), savedApplication.getStatus());
    }

    @Test
    public void testUpdateApplication_ApplicationAlreadyCompleted() {
        testApplication.setStatus(ApplicationStatus.COMPLETED.name());
        when(userService.findUserByUsername("testUser")).thenReturn(testUser);
        when(applicationRepository.findApplicationByUsernameIgnoreCase(testUser.getUsername()))
                .thenReturn(Optional.of(testApplication));

        Application newApplicationData = new Application();
        newApplicationData.setData(getCompletedTestData());

        assertThrows(InvalidDataException.class,
                () -> applicationService.updateApplication(newApplicationData, "testUser"));
    }

    @Test
    public void testUpdateApplication_ApplicationInProgress() {
        testApplication.setStatus(ApplicationStatus.IN_PROGRESS.name());
        testApplication.setData(getIncompleteTestData());
        when(userService.findUserByUsername("testUser")).thenReturn(testUser);
        when(applicationRepository.findApplicationByUsernameIgnoreCase(testUser.getUsername()))
                .thenReturn(Optional.of(testApplication));

        Application newApplicationData = new Application();
        newApplicationData.setData(getCompletedTestData());
        when(applicationRepository.save(any())).thenReturn(newApplicationData);

        Application updatedApplication = applicationService.updateApplication(newApplicationData, "testUser");

        assertNotNull(updatedApplication);
        assertEquals(ApplicationStatus.COMPLETED.name(), updatedApplication.getStatus());
    }

    @Test
    public void testDeleteApplicationByUsername() {
        when(userService.findUserByUsername("testUser")).thenReturn(testUser);
        when(applicationRepository.findApplicationByUsernameIgnoreCase(testUser.getUsername()))
                .thenReturn(Optional.of(testApplication));

        applicationService.deleteApplicationByUsername("testUser");

        verify(applicationRepository, times(1)).delete(testApplication);
    }

    @Test
    public void testDeleteApplicationByUsername_ApplicationNotFound() {
        when(userService.findUserByUsername("testUser")).thenReturn(testUser);
        when(applicationRepository.findApplicationByUsernameIgnoreCase(testUser.getUsername()))
                .thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> applicationService.deleteApplicationByUsername("testUser"));
    }

    private String getIncompleteTestData() {
        return """
                {
                    "firstName": "Pygma",
                    "lastName": "Admin",
                    "email": "test@example.com",
                    "country": "CO",
                    "linkedIn": "https://nl.linkedin.com/in/iries-david-ibarguen-ruiz-1056101",
                    "gender": "male",
                    "quickBio": "qwqwe kqwejkqwkejhkqweekj kjkwqhekjhqwkjehkqwjehkjwqe kjqwhekjqhwekjh qu2uiu2oqiwueiou qweouoiwqueoiquweoiuwqo",
                    "topThreeSkills": [
                        "Business Development"
                    ]
                }""";
    }
    private String getCompletedTestData() {
        return """
                {
                    "firstName": "Pygma",
                    "lastName": "Admin",
                    "email": "test@example.com",
                    "country": "CO",
                    "linkedIn": "https://nl.linkedin.com/in/iries-david-ibarguen-ruiz-1056101",
                    "gender": "male",
                    "quickBio": "qwqwe kqwejkqwkejhkqweekj kjkwqhekjhqwkjehkqwjehkjwqe kjqwhekjqhwekjh qu2uiu2oqiwueiou qweouoiwqueoiquweoiuwqo",
                    "topThreeSkills": [
                        "Business Development"
                    ],
                    "topThreeExperiences": [
                        "Mobility",
                        "E-commerce"
                    ],
                    "startupName": "asdas",
                    "startupWebsite": "http://1.com",
                    "startupDemo": "http://asdaa.com",
                    "startupTime": "2",
                    "startupWhy": "asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdasdasdasd asd asd asd asd as",
                    "startupHowFar": "I have significant traction (users/sales/capital)",
                    "startupHowMuchRaised": "100.000",
                    "startupFundraising": "Yes",
                    "startupNeeds": [
                        "Fundraising for your Startup"
                    ],
                    "startupExpectations": "asdasd",
                    "startupCoFounders": 3,
                    "startupHowMeetCoFounders": "asdasd",
                    "startupHowBigTeam": "5-10",
                    "startupShortBlurb": "asd asd as asd asda s as d",
                    "startupPurpose": "asds",
                    "startupIndustry": "Hardware",
                    "startupHowBigMarket": "asd",
                    "startupUniqueMarketInsight": "asd",
                    "startupUnfairAdvantage": "asd",
                    "startupBusinessModel": "Marketplace",
                    "startupCustomerSegment": [
                        "C2C"
                    ],
                    "startupPeopleUsingProduct": "Yes",
                    "startupActiveUsers": "345",
                    "startupPayingUsers": "345",
                    "startupFinanciallySustainable": "Yes",
                    "startupMakeMoneyPerMonth": "123",
                    "startupSpendMoneyPerMonth": "3333",
                    "startupBiggestChallenge": "sadas",
                    "startupFormAnyLegalCompanyYet": "Yes",
                    "startupLegalStructure": "Local legal entity",
                    "startupLegalStructureDescription": "asd",
                    "startupPitchDeck": "http://www.coms",
                    "startupVideo": "http://www.com",
                    "whatConvincedYouToApply": "asdasd",
                    "someoneEncourageYouToApply": "Yes",
                    "referralName": "asd asd asd asd asd",
                    "howDidYouHearAboutUs": [
                        "Twitter"
                    ],
                    "confirmForm": [
                        "Yes"
                    ]
                }""";
    }
}
