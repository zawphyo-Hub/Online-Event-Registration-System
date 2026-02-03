package EventReg_SpringBoot.backend_eventRegistration.event;

import EventReg_SpringBoot.backend_eventRegistration.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long event_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String event_title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private LocalDate start_date;
    private LocalDate end_date;

    private LocalTime start_time;
    private LocalTime end_time;


    private String event_image_url;

    private String slug;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private EventStatus status = EventStatus.DRAFT;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }


}
