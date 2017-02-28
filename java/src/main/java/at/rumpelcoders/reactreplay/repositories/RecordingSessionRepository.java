package at.rumpelcoders.reactreplay.repositories;

import at.rumpelcoders.reactreplay.models.RecordingSession;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by chzellot on 28.02.17.
 */
public interface RecordingSessionRepository extends CrudRepository<RecordingSession, String> {

    List<RecordingSession> findAllByOrderByTimestampDesc();
}
