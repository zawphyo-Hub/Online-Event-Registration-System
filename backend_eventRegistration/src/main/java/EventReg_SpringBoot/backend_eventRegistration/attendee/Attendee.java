package EventReg_SpringBoot.backend_eventRegistration.attendee;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import EventReg_SpringBoot.backend_eventRegistration.template.Template;
import EventReg_SpringBoot.backend_eventRegistration.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attendees")
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendee_id;

    private String firstName;
    private String lastName;
    private String email;

    private String secretKey;

    private Boolean isVerified;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;


}
