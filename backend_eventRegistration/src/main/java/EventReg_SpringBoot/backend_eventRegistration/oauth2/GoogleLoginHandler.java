package EventReg_SpringBoot.backend_eventRegistration.oauth2;

import EventReg_SpringBoot.backend_eventRegistration.twofa.TwoFAService;
import EventReg_SpringBoot.backend_eventRegistration.user.User;
import EventReg_SpringBoot.backend_eventRegistration.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class GoogleLoginHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final TwoFAService twoFAService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name"); // name from Google Account

        if (email == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Google Email not found.");
            return;
        }

        // check user exist in database, if not store user.
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);

            // Google returns "name" from email as user name
            newUser.setUsername(name != null ? name : "Google User");

            // Set null for password (Google SignUp)
            newUser.setPassword("");

            return userRepository.save(newUser);
        });


        // After successful, Redirect to frontend
        boolean mfaEnabled = Boolean.TRUE.equals(user.getMfaEnabled());
        boolean mfaVerified = Boolean.TRUE.equals(user.getIsMfaVerified());

        if (Boolean.TRUE.equals(user.getMfaEnabled()) && user.getSecretKey2FA() == null) {
            user.setSecretKey2FA(twoFAService.generateSecretKey());
            userRepository.save(user);
        }

        String qrCode = "";
        if (Boolean.TRUE.equals(user.getMfaEnabled()) && !Boolean.TRUE.equals(user.getIsMfaVerified())) {
            qrCode = twoFAService.generateQrCode(user.getSecretKey2FA());
        }


        String redirectUrl = "http://localhost:5173/google-handler"
                + "?email=" + URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8)
                + "&username=" + URLEncoder.encode(user.getUsername(), StandardCharsets.UTF_8)
                + "&id=" + user.getUserID()
                + "&mfaEnabled=" + mfaEnabled
                + "&mfaVerified=" + mfaVerified
                + "&secretQrCode=" + URLEncoder.encode(qrCode, StandardCharsets.UTF_8);

        response.sendRedirect(redirectUrl);

    }

}
