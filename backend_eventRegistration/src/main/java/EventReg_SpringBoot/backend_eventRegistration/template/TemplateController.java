package EventReg_SpringBoot.backend_eventRegistration.template;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/templates")
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping("/getAllTemplate")
    public List<Template> getAllTemplates() {
        return templateService.getAllTemplates();
    }

    @GetMapping("/{id}")
    public Template getTemplateById(@PathVariable Long id) {
        return templateService.getTemplateById(id);
    }

    @PostMapping("/createTemplate")
    public List<Template> createTemplates(@RequestBody List<Template> templates) {
        return templateService.createTemplates(templates);
    }

}
