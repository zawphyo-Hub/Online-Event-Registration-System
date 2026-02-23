package EventReg_SpringBoot.backend_eventRegistration.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public User updateUser(Long userID, User user) {

        User existingUser = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found"));


        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setMfaEnabled(user.getMfaEnabled());

        return userRepository.save(existingUser);
    }
}
