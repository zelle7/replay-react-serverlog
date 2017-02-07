package at.rumpelcoders.sparkrest;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

import static spark.Spark.get;
import static spark.Spark.post;

public class Main {
    static Logger logger = LoggerFactory.getLogger(Main.class);
    static Map<String, List<UILog>> data;

    public static void main(String[] args) {
        data = new HashMap<>();
        Gson gson = new Gson();

        get("/hello", (req, res) -> "Hello World");

        post("/log", (req, res) -> {
            try {
                if (!data.containsKey(req.session().id())) {
                    data.put(req.session().id(), new ArrayList<>());
                }

                data.put(req.session().id(), Arrays.asList(gson.fromJson(req.body(), UILog[].class)));
                return "parsed";
            } catch (Exception e) {
                logger.error("error", e);
                res.status(500);
                return "error" + e.getMessage();
            }
        });
        get("/list", (req, res) -> {
            if (data.containsKey(req.session().id())) {
                List<UILog> sortedList = data.get(req.session().id());
                Collections.sort(sortedList);
                res.header("Content-Type", "application/json");
                return gson.toJson(sortedList);
            } else {
                return "[]";
            }
        });

    }
}