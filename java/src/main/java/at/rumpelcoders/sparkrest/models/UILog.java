package at.rumpelcoders.sparkrest.models;

/**
 * Created by chzellot on 07.02.17.
 */
public class UILog implements Comparable<UILog> {

    private String log;
    private long timestamp;

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

    @Override
    public int compareTo(UILog o) {
        return Long.compare(this.timestamp, o.timestamp);
    }
}
