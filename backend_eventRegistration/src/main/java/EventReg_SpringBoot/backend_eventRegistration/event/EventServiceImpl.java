package EventReg_SpringBoot.backend_eventRegistration.event;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;

    @Override
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }


    @Override
    public Event getEventBySlug(String slug) {
        return eventRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }


    @Override
    public Event createEvent(Event event) {

        event.setSlug(
                generateEventSlug(event.getEvent_title()) + "-" + eventRepository.save(event).getEvent_id()
        );
        event.setStatus(EventStatus.DRAFT);
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(Long id, Event event) {
        Event event1 = getEventById(id);

        event1.setEvent_title(event.getEvent_title());
        event1.setDescription(event.getDescription());
        event1.setLocation(event.getLocation());
        event1.setStart_date(event.getStart_date());
        event1.setStart_time(event.getStart_time());
        event1.setEvent_image_url(event.getEvent_image_url());

        return eventRepository.save(event1);
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }



    // ---- generate slug for end point -----
    private String generateEventSlug(String event_title) {
        return event_title
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }


}
