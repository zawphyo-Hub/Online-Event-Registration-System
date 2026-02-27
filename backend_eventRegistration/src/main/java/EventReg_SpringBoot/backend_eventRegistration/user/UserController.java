package EventReg_SpringBoot.backend_eventRegistration.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @PutMapping("/update/{userID}")
    public User updateUser(@PathVariable Long userID, @RequestBody User updatedUser) {
        return userService.updateUser(userID, updatedUser);
    }


    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) throws Exception {
        userService.sendPasswordResetLink(email);
        return "Reset link sent to your email.";
    }


    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {

        userService.resetPassword(token, newPassword);
        return "Password reset successful.";
    }
}
