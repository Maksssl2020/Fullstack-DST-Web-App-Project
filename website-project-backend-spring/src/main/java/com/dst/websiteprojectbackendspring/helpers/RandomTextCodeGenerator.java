package com.dst.websiteprojectbackendspring.helpers;

import java.util.Random;

public class RandomTextCodeGenerator {
    private static final String SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    private static final Random RANDOM_INDEX = new Random();

    public static String generateCode(int codeSize) {
        StringBuilder codeBuilder = new StringBuilder();

        for (int i = 0; i < codeSize; i++) {
            int drawnIndex = RANDOM_INDEX.nextInt(SYMBOLS.length());
            codeBuilder.append(SYMBOLS.charAt(drawnIndex));
        }

        return codeBuilder.toString();
    }
}
