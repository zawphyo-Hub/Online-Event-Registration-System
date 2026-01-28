package EventReg_SpringBoot.backend_eventRegistration.twofa;

import dev.samstevens.totp.code.*;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.time.TimeProvider;
import dev.samstevens.totp.util.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TwoFAService {

    public String generateSecretKey(){
        return new DefaultSecretGenerator().generate(); // generate secret key.

    }

    // Generate QR code for TOTP
    public String generateQrCode(String secret){
        QrData qrData = new QrData.Builder()
                .label("2FA-TOTP")
                .secret(secret)
                .issuer("Event Registration Platform")
                .algorithm(HashingAlgorithm.SHA1)
                .digits(6) // 6 digits
                .period(30) //30s default for TOTP code expiry
                .build();

        QrGenerator qrGenerator = new ZxingPngQrGenerator(); // from dependencies
        byte[] imageData = new byte[0];
        try{
            imageData = qrGenerator.generate(qrData);
        } catch (QrGenerationException e) {
            log.error("Error generating qr code");
            throw new RuntimeException(e);
        }
        return Utils.getDataUriForImage(imageData, qrGenerator.getImageMimeType());
    }


    //check totp valid, expired or invalid
    public boolean isTotpValid(String secretKey, String code){
        TimeProvider timeProvider = new SystemTimeProvider();
        CodeGenerator codeGenerator = new DefaultCodeGenerator();
        DefaultCodeVerifier codeVerifier = new DefaultCodeVerifier( codeGenerator, timeProvider);

        return codeVerifier.isValidCode(secretKey, code);

    }


    public boolean isTotpNotValid(String secret, String code){

        return !this.isTotpValid(secret, code);

    }


}
