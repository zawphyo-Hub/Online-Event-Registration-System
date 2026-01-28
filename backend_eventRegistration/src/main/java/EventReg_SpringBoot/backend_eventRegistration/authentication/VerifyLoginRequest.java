package EventReg_SpringBoot.backend_eventRegistration.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerifyLoginRequest {
    private String email;
    private String verificationCode;

}
