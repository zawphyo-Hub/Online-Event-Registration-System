package EventReg_SpringBoot.backend_eventRegistration.user;

import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User updateUser(Long userID, User user);
}
