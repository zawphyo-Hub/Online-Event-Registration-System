package EventReg_SpringBoot.backend_eventRegistration.authentication;

import EventReg_SpringBoot.backend_eventRegistration.twofa.TwoFAService;
import EventReg_SpringBoot.backend_eventRegistration.user.User;
import EventReg_SpringBoot.backend_eventRegistration.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;

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

    public AuthenticationReponse register(RegisterRequest registerRequest) {

        // check registered emails
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email already exist!!");

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




}
