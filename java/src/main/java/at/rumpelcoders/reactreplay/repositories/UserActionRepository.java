package at.rumpelcoders.reactreplay.repositories;

import at.rumpelcoders.reactreplay.models.UserAction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by chzellot on 22.02.17.
 */
@Repository
public interface UserActionRepository extends CrudRepository<UserAction, String> {


    List<UserAction> findByRecordingSessionIdOrderByTimestamp(String recordingSessionId);
}
