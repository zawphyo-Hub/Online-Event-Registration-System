package EventReg_SpringBoot.backend_eventRegistration.user;

import EventReg_SpringBoot.backend_eventRegistration.emailService.EmailService;
import EventReg_SpringBoot.backend_eventRegistration.twofa.TwoFAService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final TwoFAService twoFAService;

    @Override
    public User updateUser(Long userID, User user) {

        User existingUser = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found"));


        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());

        Boolean oldMfa = existingUser.getMfaEnabled();
        Boolean newMfa = user.getMfaEnabled();

        // Treat null as false
        boolean wasMfaEnabled = Boolean.TRUE.equals(oldMfa);
        boolean isMfaEnabled = Boolean.TRUE.equals(newMfa);

        // User enables MFA (false to true)
        if (!wasMfaEnabled && isMfaEnabled) {

            // Generate new secret key
            String secretKey = twoFAService.generateSecretKey();
            existingUser.setSecretKey2FA(secretKey);
            existingUser.setMfaEnabled(true);
            existingUser.setIsMfaVerified(false); // yet this is false, user not scan QR code

            userRepository.save(existingUser);

            // Return QR code
            User responseUser = new User();
            responseUser.setUserID(existingUser.getUserID());
            responseUser.setUsername(existingUser.getUsername());
            responseUser.setEmail(existingUser.getEmail());
            responseUser.setMfaEnabled(true);

            // generate qr code
            responseUser.setSecretKey2FA(twoFAService.generateQrCode(secretKey));

            return responseUser;
        }

        // User disables MFA (true to false)
        if (wasMfaEnabled && !isMfaEnabled) {
            existingUser.setMfaEnabled(false);
            existingUser.setSecretKey2FA(null);
            existingUser.setIsMfaVerified(false);
            return userRepository.save(existingUser);
        }


        return userRepository.save(existingUser);
    }

    // for sending reset link
    @Override
    public void sendPasswordResetLink(String email) throws Exception {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("No Email Found.");
        }

        User user = optionalUser.get();

        // Generate token
        String token = UUID.randomUUID().toString();

        // Expiry time (15 minutes)
        long expiryTime = System.currentTimeMillis() + (1000 * 60 * 15);

        user.setResetPwToken(token);
        user.setResetTokenExpiry(expiryTime);
        userRepository.save(user);

        // Frontend reset link
        String resetLink = "http://localhost:5173/reset-password?token=" + token;

        // send email using EmailService class
        emailService.sendPasswordResetEmail(
                user.getEmail(),
                user.getUsername(),
                resetLink
        );
    }

    // For reset password
    @Override
    public void resetPassword(String token, String newPassword) {

        Optional<User> optionalUser = userRepository.findByResetPwToken(token);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid reset token.");
        }

        User user = optionalUser.get();

        // Check link whether it is expired or not
        if (user.getResetTokenExpiry() == null ||
                user.getResetTokenExpiry() < System.currentTimeMillis()) {
            throw new RuntimeException("Reset token expired.");
        }

        // Encrypt new password
        user.setPassword(passwordEncoder.encode(newPassword));

        // Clear token after reset
        user.setResetPwToken(null);
        user.setResetTokenExpiry(null);

        userRepository.save(user);
    }
}
