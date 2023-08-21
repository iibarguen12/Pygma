package com.pygma.userservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pygma.userservice.entity.Application;
import com.pygma.userservice.entity.User;
import com.pygma.userservice.exception.InvalidDataException;
import com.pygma.userservice.exception.NotFoundException;
import com.pygma.userservice.model.ApplicationDetails;
import com.pygma.userservice.model.ApplicationStatus;
import com.pygma.userservice.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ApplicationServiceImpl implements ApplicationService{

    private final UserService userService;
    private final ApplicationRepository applicationRepo;

    @Autowired
    private EmailService emailService;

    @Override
    @Transactional(readOnly = true)
    public Application findApplicationByUsername(String username) {
        User user = getUserByUsername(username);
        return getApplicationByUsername(user.getUsername());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Application> getApplications() {
        log.info("Fetching all applications");
        return applicationRepo.findAll();
    }

    @Override
    public Application saveApplication(Application application) {
        User user = getUserByUsername(application.getUsername());
        try{
            Application existentApplication = getApplicationByUsername(user.getUsername());
            String message = String.format("An application already exists for the user %s in status %s",
                    application.getUsername(), existentApplication.getStatus());

            log.error(message);
            throw new InvalidDataException(message);
        }catch (NotFoundException e){

            validateApplication(application, user);
            return applicationRepo.save(application);
        }
    }

    @Override
    public Application updateApplication(Application newApplication, String username) {
        User user = getUserByUsername(username);
        Application existentApplication = getApplicationByUsername(user.getUsername());
        if (existentApplication.getStatus().equalsIgnoreCase(ApplicationStatus.COMPLETED.name())) {
            log.error("The application is already completed for user: {}", username);
            throw new InvalidDataException("The application is already completed.");
        }
        existentApplication.setUpdated(new Timestamp(System.currentTimeMillis()));
        existentApplication.setData(newApplication.getData());
        existentApplication.setStatus(newApplication.getStatus());
        validateApplication(existentApplication, user);
        return applicationRepo.save(existentApplication);
    }

    @Override
    public void deleteApplicationByUsername(String username) {
        User user = getUserByUsername(username);
        Application application = getApplicationByUsername(user.getUsername());
        applicationRepo.delete(application);
    }

    private User getUserByUsername(String username) {
        return userService.findUserByUsername(username);
    }

    private Application getApplicationByUsername(String username) {
        User user = getUserByUsername(username);
        return applicationRepo.findApplicationByUsernameIgnoreCase(user.getUsername())
                .orElseThrow(() -> new NotFoundException("No application found for user: " + username));
    }

    private void validateApplication(Application application, User user) {
        ApplicationDetails dataDetails = parseData(application.getData());
        if (application.getStatus() == null || application.getStatus().isEmpty()) {
            application.setStatus(isDataFulfilled(dataDetails) ?
                    ApplicationStatus.COMPLETED.name() : ApplicationStatus.IN_PROGRESS.name());
        } else if (application.getStatus().equalsIgnoreCase(ApplicationStatus.COMPLETED.name())) {
            emailService.composeAndSendApplicationEmail(user);
        }
        application.setCreated(application.getCreated() == null?
                new Timestamp(System.currentTimeMillis()) : application.getCreated() );
    }

    private ApplicationDetails parseData(String jsonData) {
        try {
            if (jsonData == null || jsonData.isEmpty()) {
                throw new InvalidDataException("JSON data is empty or null.");
            }
            ObjectMapper mapper = new ObjectMapper();
            ApplicationDetails details = mapper.readValue(jsonData, ApplicationDetails.class);
            log.info("Parsed ApplicationDetails: {}", details);
            return details;
        } catch (IOException e) {
            log.error("Error parsing application data JSON: {}", e.getMessage());
            log.debug("Failed JSON data: {}", jsonData);
            throw new InvalidDataException("Invalid application data format.");
        }
    }

    private boolean isDataFulfilled(ApplicationDetails data) {
        List<String> requiredFields = getRequiredFields();
        return requiredFields.stream().allMatch(field -> getField(data, field) != null);
    }

    private Object getField(ApplicationDetails data, String fieldName) {
        try {
            Field field = ApplicationDetails.class.getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(data);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            // Handle exceptions if necessary
        }
        return null;
    }

    private List<String> getRequiredFields() {
        return Arrays.asList(
                "firstName", "lastName", "email", "country", "linkedIn", "gender", "quickBio",
                "topThreeSkills", "topThreeExperiences", "startupName", "startupWebsite", "startupDemo",
                "startupTime", "startupWhy", "startupHowFar", "startupFundraising", "startupNeeds",
                "startupExpectations", "startupCoFounders", "startupHowMeetCoFounders", "startupHowBigTeam",
                "startupShortBlurb", "startupPurpose", "startupIndustry", "startupHowBigMarket",
                "startupUniqueMarketInsight", "startupUnfairAdvantage", "startupBusinessModel",
                "startupCustomerSegment", "startupPeopleUsingProduct", "startupActiveUsers",
                "startupPayingUsers", "startupFinanciallySustainable", "startupMakeMoneyPerMonth",
                "startupSpendMoneyPerMonth", "startupBiggestChallenge", "startupFormAnyLegalCompanyYet",
                "startupLegalStructure", "startupLegalStructureDescription", "whatConvincedYouToApply",
                "someoneEncourageYouToApply", "howDidYouHearAboutUs", "confirmForm"
        );
    }
}
