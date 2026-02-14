package EventReg_SpringBoot.backend_eventRegistration.event;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EventService {

    Event getEventById(Long Id);
    Event getEventBySlug(String slug);
    Event createEvent(Event event);
    Event updateEvent(Long id, Event event);
    void deleteEvent(Long id);
    List<Event> getEventsByUserId(Long userId);


}
