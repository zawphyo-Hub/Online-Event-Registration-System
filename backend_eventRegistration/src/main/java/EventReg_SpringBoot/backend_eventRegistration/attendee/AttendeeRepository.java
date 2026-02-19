package EventReg_SpringBoot.backend_eventRegistration.attendee;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    List<Attendee> findByEvent_EventId(Long Id);
    Optional<Attendee> findBySecretKey(String secretKey);

}
