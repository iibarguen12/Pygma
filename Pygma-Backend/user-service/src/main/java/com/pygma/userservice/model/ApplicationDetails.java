package com.pygma.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ApplicationDetails {
    private String firstName;
    private String lastName;
    private String email;
    private String country;
    private String linkedIn;
    private String gender;
    private String quickBio;
    private List<String> topThreeSkills;
    private List<String> topThreeExperiences;
    private String startupName;
    private String startupWebsite;
    private String startupDemo;
    private String startupTime;
    private String startupWhy;
    private String startupHowFar;
    private String startupHowMuchRaised;
    private String startupFundraising;
    private List<String> startupNeeds;
    private String startupExpectations;
    private int startupCoFounders;
    private String startupHowMeetCoFounders;
    private String startupHowBigTeam;
    private String startupShortBlurb;
    private String startupPurpose;
    private String startupIndustry;
    private String startupHowBigMarket;
    private String startupUniqueMarketInsight;
    private String startupUnfairAdvantage;
    private String startupBusinessModel;
    private List<String> startupCustomerSegment;
    private String startupPeopleUsingProduct;
    private String startupActiveUsers;
    private String startupPayingUsers;
    private String startupFinanciallySustainable;
    private String startupMakeMoneyPerMonth;
    private String startupSpendMoneyPerMonth;
    private String startupBiggestChallenge;
    private String startupFormAnyLegalCompanyYet;
    private String startupLegalStructure;
    private String startupLegalStructureDescription;
    private String startupPitchDeck;
    private String startupVideo;
    private String whatConvincedYouToApply;
    private String someoneEncourageYouToApply;
    private String referralName;
    private List<String> howDidYouHearAboutUs;
    private List<String> confirmForm;
}
