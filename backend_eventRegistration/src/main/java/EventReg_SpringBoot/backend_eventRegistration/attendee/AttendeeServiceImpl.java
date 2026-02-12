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
        return attendeeRepository.save(attendee);
    }

    @Override
    public Attendee updateAttendee(Long id, Attendee attendee) {
        Attendee newAttendee = getAttendeeById(id);

        newAttendee.setAttendee_name(attendee.getAttendee_name());
        newAttendee.setEmail(attendee.getEmail());


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


}
