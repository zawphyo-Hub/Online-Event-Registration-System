package EventReg_SpringBoot.backend_eventRegistration.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/EventApi/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationReponse> register(
            @RequestBody RegisterRequest registerRequest){
        var response = authenticationService.register(registerRequest);
        return ResponseEntity.ok(response);

    }

}
