package at.rumpelcoders.sparkrest.driver;

import at.rumpelcoders.sparkrest.models.UILog;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;

import java.io.IOException;
import java.io.StringWriter;
import java.util.*;

import static spark.Spark.*;

/**
 * @author chzellot
 */
public class MainClass {

    static Map<String, List<UILog>> data;
    static Logger logger = LoggerFactory.getLogger(MainClass.class);

    /**
     * Entry Point
     *
     * @param args
     */
    public static void main(String[] args) {

        int port = 4567;
        if (args.length > 0) {
            port = Integer.parseInt(args[0]);
        }
        port(port);
        staticFileLocation("/public");
        MainClass s = new MainClass();
        data = new HashMap<>();
        s.init();
    }

    /**
     * Function for Routes
     */
    private void init() {
        data = new HashMap<>();


        post("/log", (req, res) -> {
            try {
                String token = getUserTokenFromReq(req);
                if (!data.containsKey(token)) {
                    data.put(token, new ArrayList<>());
                }
                ObjectMapper mapper = new ObjectMapper();
                data.get(token).addAll(Arrays.asList(mapper.readValue(req.body(), UILog[].class)));
                res.status(200);
                return "parsed";
            } catch (Exception e) {
                logger.error("error", e);
                res.status(500);
                return "error" + e.getMessage();
            }
        });
        get("/list", (req, res) -> {
            String token = getUserTokenFromReq(req);
            if (data.containsKey(token)) {
                List<UILog> sortedList = data.get(token);
                Collections.sort(sortedList);
                res.type("application/json");
                res.header("Access-Control-Allow-Origin", "http://localhost:3000");
                res.header("Access-Control-Allow-Credentials", "true");
                res.status(200);
                return toJSON(sortedList);
            } else {
                res.status(400);
                return toJSON(new ArrayList<>());
            }
        });
        get("/listsesssions", (req, res) -> {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Credentials", "true");
            return toJSON(data.keySet());
        });

    }

    /**
     * This function converts an Object to JSON String
     *
     * @param obj
     */
    private static String toJSON(Object obj) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            StringWriter sw = new StringWriter();
            mapper.writeValue(sw, obj);
            return sw.toString();
        } catch (IOException e) {
            logger.error("error on creating json", e);
        }
        return null;
    }

    private static String getUserTokenFromReq(Request request) {
        return request.queryParams("token") != null ? request.queryParams("token") : request.session().id();
    }

}
