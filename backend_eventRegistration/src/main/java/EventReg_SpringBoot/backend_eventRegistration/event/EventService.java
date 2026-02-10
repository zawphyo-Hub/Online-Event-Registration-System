package EventReg_SpringBoot.backend_eventRegistration.event;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface EventService {

    Event getEventById(Long Id);
    Event getEventBySlug(String slug);
    Event createEvent(Event event);
    Event updateEvent(Long id, Event event);
    void deleteEvent(Long id);

}
