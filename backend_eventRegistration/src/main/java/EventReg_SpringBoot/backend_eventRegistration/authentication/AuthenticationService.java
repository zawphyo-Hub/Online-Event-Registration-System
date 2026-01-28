package EventReg_SpringBoot.backend_eventRegistration.authentication;

import EventReg_SpringBoot.backend_eventRegistration.twofa.TwoFAService;
import EventReg_SpringBoot.backend_eventRegistration.user.User;
import EventReg_SpringBoot.backend_eventRegistration.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TwoFAService twoFAService;

    // ---- Register Process ----
    public AuthenticationReponse register(RegisterRequest registerRequest) {

        // check registered emails
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email already exist.");

        }

        var user = User.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .mfaEnabled(registerRequest.isMfaEnabled())
                .build();


        // if mfaEnabled = true, Generate secret key.
        if(registerRequest.isMfaEnabled()){
            user.setSecretKey2FA(twoFAService.generateSecretKey());
        }

        userRepository.save(user);
        return AuthenticationReponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .secretQrCode(twoFAService.generateQrCode(user.getSecretKey2FA()))
                .mfaEnabled(user.getMfaEnabled())
                .build();

    }

    // ---- Login Process ----
    public AuthenticationReponse login(LoginRequest loginRequest) {


        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email or Password Incorrect.");
        }

        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email or Password Incorrect.")
        );

        if (user.getMfaEnabled()){ //if mfa enable
            return AuthenticationReponse.builder()

                    .mfaEnabled(true) //frontend will check this to decide what to do next
                    .build();

        }

        return AuthenticationReponse.builder()

                .mfaEnabled(false)
                .email(user.getEmail())
                .username(user.getUsername())
                .build();

    }

    // ---- Verifying user with TOTP code ----
    public AuthenticationReponse verificationCode(VerifyLoginRequest verifyLoginRequest) {
        User user = userRepository
                .findByEmail(verifyLoginRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(("No user found.")));



        String secretKey = user.getSecretKey2FA();
        String code = verifyLoginRequest.getVerificationCode();
        boolean valid = twoFAService.isTotpValid(secretKey, code);


        if (!valid) {
            throw new BadCredentialsException("Verification Code Incorrect.");
        }

        return AuthenticationReponse.builder()
                .mfaEnabled(user.getMfaEnabled())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();


    }




}
