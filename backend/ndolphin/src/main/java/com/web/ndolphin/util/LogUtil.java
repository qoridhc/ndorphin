package com.web.ndolphin.util;

import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

@Slf4j
public class LogUtil {

    public static void info(String message, Object... args) {
        log.info(format(message, args));
    }

    public static void debug(String message, Object... args) {
        log.debug(format(message, args));
    }

    public static void warn(String message, Object... args) {
        log.warn(format(message, args));
    }

    public static void error(String message, Object... args) {
        log.error(format(message, args));
    }

    private static String format(String message, Object... args) {
        return String.format("[LOG] %s - %s : %s", Thread.currentThread().getStackTrace()[3].getMethodName(), message, Arrays.toString(args));
    }

}
