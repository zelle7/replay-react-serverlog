package at.rumpelcoders.sparkrest;

import jdk.nashorn.internal.objects.Global;
import jdk.nashorn.internal.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static spark.Spark.*;

public class Main {
    static Logger logger = LoggerFactory.getLogger(Main.class);
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello World");

        post("/log", (req, res) -> {
            try {
                JSONParser jsonParser = new JSONParser(req.body(), Global.instance(), false);
                jsonParser.parse();
                return "parsed";
            } catch (Exception e){
                logger.error("error", e);
            }
            return "error";
        });

    }
}