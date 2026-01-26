package EventReg_SpringBoot.backend_eventRegistration.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AuthenticationReponse {

    private String email;
    private String username;
    private Boolean mfaEnabled;
    private String secretQrCode;
}
