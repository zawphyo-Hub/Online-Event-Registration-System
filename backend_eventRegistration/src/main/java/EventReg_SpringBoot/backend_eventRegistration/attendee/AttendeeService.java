package EventReg_SpringBoot.backend_eventRegistration.attendee;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AttendeeService {

    Attendee getAttendeeById(Long Id);
    Attendee createAttendee(Attendee attendee);
    Attendee updateAttendee(Long id, Attendee attendee);
    void deleteAttendee(Long id);
    List<Attendee> getAttendeesByEvent(Long Id);
    Attendee getAttendeeBySecretKey(String secretKey);

}
