package at.rumpelcoders.reactreplay.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Created by chzellot on 07.02.17.
 */
@Entity
public class UILog implements Comparable<UILog> {


    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String uuid;

    @Lob
    private String log;
    private String token;
    private long timestamp;

    public UILog(){}

    public UILog(String log, long timestamp) {
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public int compareTo(UILog o) {
        return Long.compare(this.timestamp, o.timestamp);
    }
}
