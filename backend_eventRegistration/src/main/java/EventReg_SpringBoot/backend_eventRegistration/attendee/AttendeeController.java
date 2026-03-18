package EventReg_SpringBoot.backend_eventRegistration.attendee;

import EventReg_SpringBoot.backend_eventRegistration.emailService.EmailService;
import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import EventReg_SpringBoot.backend_eventRegistration.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendees")
public class AttendeeController {

    private final AttendeeService attendeeService;
    private final EventService eventService;
    private final EmailService emailService;


    // store attendee info using event_slug rather than event_id
    @PostMapping("/register-attendee/{slug}")
    public ResponseEntity<Attendee> registerAttendee(
            @PathVariable String slug,
            @RequestBody Attendee attendee
    ) throws Exception{
        Event event = eventService.getEventBySlug(slug);

        attendee.setEvent(event);
        Attendee saved = attendeeService.createAttendee(attendee);

        // for sending email confirmation
        String eventDate = event.getStart_date().format(DateTimeFormatter.ofPattern("dd MMM yyyy"));
        String eventStartTime = event.getStart_time().format(DateTimeFormatter.ofPattern("hh:mm a"));
        String eventEndTime = event.getEnd_time().format(DateTimeFormatter.ofPattern("hh:mm a"));
        emailService.sendAttendeeEmail(
                saved.getEmail(),
                saved.getFirstName(),
                saved.getLastName(),
                event.getEvent_title(),

                eventDate,
                eventStartTime,
                eventEndTime,
                event.getLocation(),
                saved.getSecretKey()
        );
        return ResponseEntity.ok(saved);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Attendee> updateAttendee(
            @PathVariable Long id,
            @RequestBody Attendee attendee
    ) {
        return ResponseEntity.ok(attendeeService.updateAttendee(id, attendee));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAttendee(@PathVariable Long id) {
        attendeeService.deleteAttendee(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/getAttendeeEvent/{eventId}")
    public ResponseEntity<List<Attendee>> getAttendeesForEvent(@PathVariable Long eventId) {
        List<Attendee> attendees = attendeeService.getAttendeesByEvent(eventId);
        return ResponseEntity.ok(attendees);
    }


    @GetMapping("/verify/{secretKey}")
    public ResponseEntity<?> verifyAttendee(@PathVariable String secretKey) {
        Attendee attendee = attendeeService.getAttendeeBySecretKey(secretKey);

        if (attendee == null) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", "ERROR", "message", "Invalid QR Code."));
        }

        if (Boolean.TRUE.equals(attendee.getIsVerified())) {
            return ResponseEntity.badRequest().body(
                    Map.of("status", "ERROR", "message", "This QR Code has already been used."));
        }

        // First scan, set to true
        attendee.setIsVerified(true);
        attendeeService.updateAttendee(attendee.getAttendee_id(), attendee);

        return ResponseEntity.ok(
                Map.of(
                        "status", "SUCCESSFUL",
                        "firstName", attendee.getFirstName(),
                        "lastName", attendee.getLastName(),
                        "email", attendee.getEmail()
                )
        );
    }

}
