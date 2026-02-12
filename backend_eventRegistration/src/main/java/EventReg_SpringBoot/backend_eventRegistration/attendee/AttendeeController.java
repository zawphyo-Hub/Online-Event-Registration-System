package EventReg_SpringBoot.backend_eventRegistration.attendee;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import EventReg_SpringBoot.backend_eventRegistration.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendee")
public class AttendeeController {

    private final AttendeeService attendeeService;
    private final EventService eventService;


    // store attendee info using event_slug rather than event_id
    @PostMapping("/register-attendee/{Slug}")
    public ResponseEntity<Attendee> registerAttendee(
            @PathVariable String eventSlug,
            @RequestBody Attendee attendee
    ) {
        Event event = eventService.getEventBySlug(eventSlug);
        attendee.setEvent(event);
        Attendee saved = attendeeService.createAttendee(attendee);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Attendee> getAttendee(@PathVariable Long id) {
        return ResponseEntity.ok(attendeeService.getAttendeeById(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Attendee> updateAttendee(
            @PathVariable Long id,
            @RequestBody Attendee attendee
    ) {
        return ResponseEntity.ok(attendeeService.updateAttendee(id, attendee));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendee(@PathVariable Long id) {
        attendeeService.deleteAttendee(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/getAttendeeEvent/{eventId}")
    public ResponseEntity<List<Attendee>> getAttendeesForEvent(@PathVariable Long eventId) {
        List<Attendee> attendees = attendeeService.getAttendeesByEvent(eventId);
        return ResponseEntity.ok(attendees);
    }

}
