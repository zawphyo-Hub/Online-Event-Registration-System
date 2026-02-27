package EventReg_SpringBoot.backend_eventRegistration.user;

import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User updateUser(Long userID, User user);

    void sendPasswordResetLink(String email) throws Exception;

    void resetPassword(String token, String newPassword);
}
