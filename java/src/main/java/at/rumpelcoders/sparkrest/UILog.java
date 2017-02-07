package at.rumpelcoders.sparkrest;

/**
 * Created by chzellot on 07.02.17.
 */
public class UILog implements Comparable<UILog> {

    private String log;
    private long timestamp;

    @Override
    public int compareTo(UILog o) {
        return Long.compare(this.timestamp, o.timestamp);
    }
}
