package EventReg_SpringBoot.backend_eventRegistration.attendee;

import EventReg_SpringBoot.backend_eventRegistration.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    List<Attendee> findByEvent_EventId(Long Id);
    Optional<Attendee> findBySecretKey(String secretKey);

    @Query("""
        SELECT a FROM Attendee a
        WHERE a.event.eventId = :eventId
        AND (
            LOWER(a.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(a.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(a.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
    """)
    List<Attendee> findAttendeeByNameEmail(
            @Param("eventId") Long eventId,
            @Param("keyword") String keyword
    );

    @Modifying
    @Query("DELETE FROM Attendee a WHERE a.event.eventId = :eventId")
    void deleteByEvent_EventId(@Param("eventId") Long eventId); //  delete attendee when event is removed.

}
