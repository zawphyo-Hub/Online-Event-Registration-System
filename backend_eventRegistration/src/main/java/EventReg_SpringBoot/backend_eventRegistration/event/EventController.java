package EventReg_SpringBoot.backend_eventRegistration.event;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/event-registration/events")
public class EventController {
    private final EventService eventService;

    @PostMapping("/createEvents")
    public ResponseEntity<Event> createEvent(@RequestBody Event event){
        return org.springframework.http.ResponseEntity.ok(eventService.createEvent(event));

    }

    @GetMapping("/getSlug/{slug}")
    public ResponseEntity<Event> getEventBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(eventService.getEventBySlug(slug));
    }

    @GetMapping("Info/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }
}
