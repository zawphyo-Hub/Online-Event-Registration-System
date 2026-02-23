package EventReg_SpringBoot.backend_eventRegistration.configuration;

import EventReg_SpringBoot.backend_eventRegistration.oauth2.GoogleLoginHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final GoogleLoginHandler googleLoginHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/EventApi/authentication/**").permitAll()
                        .requestMatchers("/event-registration/events/**").permitAll()
                        .requestMatchers("/templates/**").permitAll()
                        .requestMatchers("/attendees/**").permitAll()
                        .requestMatchers("/test-email/**").permitAll()
                        .requestMatchers("/users/**").permitAll()
                        .requestMatchers("/oauth2/**", "/login/oauth2/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                .authenticationProvider(authenticationProvider)
                .oauth2Login(oauth -> oauth
                        .successHandler(googleLoginHandler)

                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .build();





    }



}

