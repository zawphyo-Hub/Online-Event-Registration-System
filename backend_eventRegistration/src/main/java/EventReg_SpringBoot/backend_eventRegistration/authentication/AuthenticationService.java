package EventReg_SpringBoot.backend_eventRegistration.authentication;

import EventReg_SpringBoot.backend_eventRegistration.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final JwtS

}
