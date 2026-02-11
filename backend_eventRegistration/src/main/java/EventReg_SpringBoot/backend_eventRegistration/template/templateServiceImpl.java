package EventReg_SpringBoot.backend_eventRegistration.template;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class templateServiceImpl implements TemplateService{
    private final TemplateRepository templateRepository;

    @Override
    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }

    @Override
    public Template getTemplateById(Long id) {
        return templateRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Template cannot found with id: " + id));
    }

    @Override
    public List<Template> createTemplates(List<Template> templates) {
        return templateRepository.saveAll(templates);
    }

}
