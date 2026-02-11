package EventReg_SpringBoot.backend_eventRegistration.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findBySlug(String slug);
    Optional<Event> findById(Long id);


}
