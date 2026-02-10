package EventReg_SpringBoot.backend_eventRegistration.event;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/event-registration/events")
public class EventController {
    private final EventService eventService;

    @PostMapping("/createEvents")
    public ResponseEntity<Event> createEvent(@RequestBody Event event){
        return org.springframework.http.ResponseEntity.ok(eventService.createEvent(event));

    }
}
