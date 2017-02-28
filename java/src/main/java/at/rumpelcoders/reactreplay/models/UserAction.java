package at.rumpelcoders.reactreplay.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by chzellot on 07.02.17.
 */
@Entity
public class UserAction implements Comparable<UserAction> {


    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String uuid;

    @Lob
    private String log;
    private long timestamp;
    private String recordingSessionId;

    @ManyToOne
    @JoinColumn(name = "recordingSessionId", insertable = false, updatable = false)
    @JsonIgnoreProperties
    private RecordingSession recordingSession;

    public UserAction() {
    }

    public UserAction(String log, long timestamp) {
        this.log = log;
        this.timestamp = timestamp;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getRecordingSessionId() {
        return recordingSessionId;
    }

    public void setRecordingSessionId(String recordingSessionId) {
        this.recordingSessionId = recordingSessionId;
    }

    @Override
    public int compareTo(UserAction o) {
        return Long.compare(this.timestamp, o.timestamp);
    }
}
