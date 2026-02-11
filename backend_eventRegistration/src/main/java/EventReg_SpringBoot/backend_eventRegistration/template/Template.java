package EventReg_SpringBoot.backend_eventRegistration.template;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "templates")
public class Template {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long template_id;

    private String template_name;
    private String template_description;

    private String primary_color;
    private String secondary_color;
    private String background_color;
    private String font_family;

    private String template_layout;
    private String template_img_url;
}
