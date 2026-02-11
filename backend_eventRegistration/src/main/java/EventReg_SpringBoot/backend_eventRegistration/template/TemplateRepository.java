package EventReg_SpringBoot.backend_eventRegistration.template;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {

    Optional<Template> findById(Long id);

}
