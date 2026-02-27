package EventReg_SpringBoot.backend_eventRegistration.emailService;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;


    // Generate QR code in email
    private byte[] generateQRCode(String text, int width, int height) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
        BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "PNG", baos);
        return baos.toByteArray();
    }

    public void sendAttendeeEmail(
            String toEmail,
            String firstName,
            String lastName,
            String eventTitle,
            String eventDate,
            String startTime,
            String endTime,
            String eventLocation,
            String secretKey
    )throws Exception {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(toEmail);
        simpleMailMessage.setSubject("Event Registration successful.");

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(toEmail);
        helper.setSubject("Event Registration Successful");


        String verificationUrl = "http://localhost:5173/verify-attendee/" + secretKey;
        byte[] qrCodeBytes = generateQRCode(verificationUrl, 200, 200);

        // Email body
        String emailMsg = "<p style='color:#000000;'>Hello " + firstName + " " + lastName + ",</p>" +
                "<p style='color:#000000;'>Thank you for registering for the event.</p>" +
                "<h3 style='color:#000000;'>Event Details:</h3>" +
                eventTitle +
                "<ul style='color:#000000;'>" +

                "<li><b>Date:</b> " + eventDate + "</li>" +
                "<li><b>Time:</b> " + startTime + " - " + endTime + "</li>" +
                "<li><b>Location:</b> " + eventLocation + "</li>" +
                "</ul>" +

                "<p style='color:#000000;'>Verification QR for check-in:</p>" +
                "<img src='cid:qrCodeImage' width='230' height='230'/>" +
                "<p style='color:#000000;'>We look forward to seeing you at the event!</p>" +
                "<p style='color:#000000;'>Best regards,<br/>Agenda.</p>";

        helper.setText(emailMsg, true);

        // Add QR code as image
        helper.addInline("qrCodeImage", new ByteArrayResource(qrCodeBytes), "image/png");

        mailSender.send(mimeMessage);
        System.out.println("Email sent.");


    }

    public void sendPasswordResetEmail(
            String toEmail,
            String username,
            String resetLink
    ) throws Exception {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request");

        String emailMsg =
                "<p>Hi " + username + ",</p>" +

                        "<p>Click the link below to reset your password:</p>" +
                        "<p><a href='" + resetLink + "'>Reset Password</a></p>" +
                        "<p>This link will be expired in 10 minutes.</p>" +
                        "<p>If you did not request this, please ignore this email.</p>" +
                        "<br/><p>Best regards,<br/>Agenda.</p>";

        helper.setText(emailMsg, true);

        mailSender.send(mimeMessage);
        System.out.println("Password reset email sent.");
    }
}
