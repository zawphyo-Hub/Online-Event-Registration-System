package EventReg_SpringBoot.backend_eventRegistration.attendee;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import EventReg_SpringBoot.backend_eventRegistration.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendees")
public class AttendeeController {

    private final AttendeeService attendeeService;
    private final EventService eventService;


    // store attendee info using event_slug rather than event_id
    @PostMapping("/register-attendee/{slug}")
    public ResponseEntity<Attendee> registerAttendee(
            @PathVariable String slug,
            @RequestBody Attendee attendee
    ) {
        Event event = eventService.getEventBySlug(slug);

        attendee.setEvent(event);
        Attendee saved = attendeeService.createAttendee(attendee);
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

}
