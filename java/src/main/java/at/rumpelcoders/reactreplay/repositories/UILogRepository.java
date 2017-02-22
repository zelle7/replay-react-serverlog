package at.rumpelcoders.reactreplay.repositories;

import at.rumpelcoders.reactreplay.models.UILog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by chzellot on 22.02.17.
 */
@Repository
public interface UILogRepository extends CrudRepository<UILog, String> {


    List<UILog> findByToken(String token);

    @Query("SELECT DISTINCT ui.token FROM UILog ui")
    List<String> findAllTokens();
}
