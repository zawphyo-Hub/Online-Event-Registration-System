package EventReg_SpringBoot.backend_eventRegistration.template;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TemplateService {

    Template getTemplateById(Long id);
    List<Template> createTemplates(List<Template> templates);
    List<Template> getAllTemplates();

}
