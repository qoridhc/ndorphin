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
        StackTraceElement element = Thread.currentThread().getStackTrace()[3];
        String className = element.getClassName();
        String methodName = element.getMethodName();

        // Format the message with class name, method name, and arguments
        return String.format("[LOG] %s %s - %s : %s", className, methodName, message, Arrays.toString(args));
    }

}
