//package EventReg_SpringBoot.backend_eventRegistration.emailService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class EmailTestController {
//    @Autowired
//    private EmailService emailService;
//
//    @GetMapping("/test-email")
//    public String testEmail() {
//
//        emailService.sendAttendeeEmail(
//                "zawphyo876@gmail.com",
//                "Zaw",
//                "Min",
//                "Demo for event registration",
//                "12 Feb",
//                "11:00",
//                "12:00",
//                "Hotel, UK.",
//                "QR code"
//        );
//
//        return "Email has been sent.";
//    }
//}
