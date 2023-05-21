package com.pygma.authservice.util;

import java.util.UUID;

public class UserUtils {

    private UserUtils() {
        // Private constructor to prevent instantiation
    }

    public static String generateRandomPassword() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("-", "").substring(0, 8);
    }
}
