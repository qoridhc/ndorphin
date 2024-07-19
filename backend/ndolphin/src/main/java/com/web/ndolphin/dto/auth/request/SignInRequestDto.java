package com.web.ndolphin.dto.auth.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class SignInRequestDto {

    private String email;

    private String password;

}
