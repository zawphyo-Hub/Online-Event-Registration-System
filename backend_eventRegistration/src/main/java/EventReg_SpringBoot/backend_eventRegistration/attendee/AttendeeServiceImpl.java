package EventReg_SpringBoot.backend_eventRegistration.attendee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendeeServiceImpl implements AttendeeService{

    private final AttendeeRepository attendeeRepository;

    @Override
    public Attendee getAttendeeById(Long id) {
        return attendeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendee not found"));
    }

    @Override
    public Attendee createAttendee(Attendee attendee) {

        // Generate a secret key
        attendee.setSecretKey(java.util.UUID.randomUUID().toString());

        // yet, verification is false.
        attendee.setIsVerified(false);

        return attendeeRepository.save(attendee);
    }

    @Override
    public Attendee updateAttendee(Long id, Attendee attendee) {
        Attendee newAttendee = getAttendeeById(id);

        newAttendee.setFirstName(attendee.getFirstName());
        newAttendee.setLastName(attendee.getLastName());
        newAttendee.setEmail(attendee.getEmail());
        newAttendee.setIsVerified(attendee.getIsVerified());


        return attendeeRepository.save(newAttendee);
    }

    @Override
    public void deleteAttendee(Long id) {
        attendeeRepository.deleteById(id);
    }

    @Override
    public List<Attendee> getAttendeesByEvent(Long Id) {
        return attendeeRepository.findByEvent_EventId(Id);
    }


    @Override
    public Attendee getAttendeeBySecretKey(String secretKey) {
        return attendeeRepository.findBySecretKey(secretKey).orElse(null);
    }

    // search attendees
    @Override
    public List<Attendee> searchAttendees(Long eventId, String keyword) {
        return attendeeRepository.findAttendeeByNameEmail(eventId, keyword);
    }


}
