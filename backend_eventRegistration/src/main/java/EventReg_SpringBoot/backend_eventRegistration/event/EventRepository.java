package EventReg_SpringBoot.backend_eventRegistration.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findBySlug(String slug);
    Optional<Event> findById(Long id);


}
