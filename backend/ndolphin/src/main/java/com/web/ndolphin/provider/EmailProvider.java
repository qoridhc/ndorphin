package com.web.ndolphin.provider;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailProvider {

    private final JavaMailSender javaMailSender;

    private final String SUBJECT = "[nDolphin] 인증 메일입니다.";

    public boolean sendCertificationMail(String email, String certificationNumber) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);

            String htmlContent = getCertificationMessage(certificationNumber);

            messageHelper.setTo(email);
            messageHelper.setSubject(SUBJECT);
            messageHelper.setText(htmlContent,true);

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    private String getCertificationMessage(String certificationNumber) {
        String certificationMessage = "";
        certificationMessage += "<div style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;'>";
        certificationMessage += "  <div style='max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'>";
        certificationMessage += "    <h1 style='text-align: center; color: #333333;'>[nDolphin MBTI 기반 플랫폼 서비스]</h1>";
        certificationMessage += "    <p style='text-align: center; color: #666666; font-size: 18px;'>아래 인증 코드를 입력하여 인증을 완료해 주세요.</p>";
        certificationMessage += "    <div style='text-align: center; margin: 30px 0;'>";
        certificationMessage += "      <span style='display: inline-block; font-size: 32px; color: #ffffff; background-color: #007BFF; padding: 10px 20px; border-radius: 5px; letter-spacing: 8px;'>" + certificationNumber + "</span>";
        certificationMessage += "    </div>";
        certificationMessage += "    <p style='text-align: center; color: #999999; font-size: 14px;'>감사합니다. CoBuy 팀</p>";
        certificationMessage += "  </div>";
        certificationMessage += "</div>";
        return certificationMessage;

    }
}
