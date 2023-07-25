package com.pygma.userservice.util;

import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserUtils {

    public static final String IMAGE_URL_PREFIX = "https://api.dicebear.com/6.x/bottts/svg?seed=";

    private UserUtils() {
        // Private constructor to prevent instantiation
    }

    public static String generateRandomPassword() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("-", "").substring(0, 12);
    }

    public static boolean isValidPassword(String password) {
        final String regex = "^(?=.*[0-9])"
                + "(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[@#$%^&+=])"
                + "(?=\\S+$).{8,20}$";
        final Pattern p = Pattern.compile(regex);
        if (password == null) {return false;}
        Matcher m = p.matcher(password);
        return m.matches();
    }
}
