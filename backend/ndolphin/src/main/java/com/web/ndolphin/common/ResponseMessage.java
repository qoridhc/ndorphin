package com.web.ndolphin.common;

public interface ResponseMessage {
    // 200
    String SUCCESS = "Success";

    String VALIDATION_FAIL = "Validation Failed";

    // 400
    String DUPLICATE_EMAIL = "Duplicate Email";

    String SIGN_IN_FAIL = "Login Information Mismatch";

    String CERTIFICATION_FAIL = "Certification Failed";

    String MAIL_FAIL = "Mail send failed.";

    //401
    String UNAUTHORIZED = "Unauthorized";

    // 500
    String DATABASE_ERROR = "Database Error";
}
