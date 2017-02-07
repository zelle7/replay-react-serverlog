package at.rumpelcoders.sparkrest.driver;

import at.rumpelcoders.sparkrest.models.UILog;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.StringWriter;
import java.util.*;

import static spark.Spark.*;

/**
 * @author prash_000
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

        get("/hello", (req, res) -> "Hello World");

        post("/log", (req, res) -> {
            try {
                if (!data.containsKey(req.session().id())) {
                    data.put(req.session().id(), new ArrayList<>());
                }
                ObjectMapper mapper = new ObjectMapper();
                data.put(req.session().id(), Arrays.asList(mapper.readValue(req.body(), UILog[].class)));
                res.status(200);
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
                res.type("application/json");
                res.header("Access-Control-Allow-Origin", "http://localhost:3000");
                res.header("Access-Control-Allow-Credentials", "true");
                res.status(200);
                ObjectMapper mapper = new ObjectMapper();
                return mapper.writeValueAsString(sortedList);
            } else {
                res.status(400);
                return "[]";
            }
        });


//    }
//        get("/", (request, response) -> {
//           Map<String, Object> viewObjects = new HashMap<String, Object>();
//           viewObjects.put("title", "Welcome to Spark Project");
//           viewObjects.put("templateName", "home.ftl");
//           return new ModelAndView(viewObjects, "main.ftl");
//        }, new FreeMarkerEngine());
//
//        get("/createUser", (request, response) -> {
//           Map<String, Object> viewObjects = new HashMap<String, Object>();
//           viewObjects.put("templateName", "createForm.ftl");
//           return new ModelAndView(viewObjects, "main.ftl");
//        }, new FreeMarkerEngine());
//
//        post("/createUser", (request, response) -> {
//            ObjectMapper mapper = new ObjectMapper();
//            try {
//                User u = mapper.readValue(request.body(), User.class);
//                if (!u.isValid()) {
//                    response.status(400);
//                    return "Correct the fields";
//                }
//                if(mod.checkUser(u.getId())) {
//                    int id = mod.createUser(u.getId(), u.getFirstName(), u.getMiddleName(), u.getLastName(),
//                    u.getAge(), u.getGender(), u.getPhone(), u.getZip());
//                    response.status(200);
//                    response.type("application/json");
//                    return id;
//                }
//                else {
//                    response.status(400);
//                    response.type("application/json");
//                    return "User Already Exists";
//                }
//                } catch (JsonParseException jpe) {
//                    response.status(404);
//                    return "Exception";
//                }
//        });
//
//        get("/getAllUsers", (request, response) -> {
//            response.status(200);
//            Map<String, Object> viewObjects = new HashMap<String, Object>();
//            viewObjects.put("templateName", "showUser.ftl");
//            return new ModelAndView(viewObjects, "main.ftl");
//        }, new FreeMarkerEngine());
//
//        get("/getusers", (request, response) -> {
//            response.status(200);
//            return toJSON(mod.sendElements());
//        });
//
//        get("/removeUser", (request, response) -> {
//           Map<String, Object> viewObjects = new HashMap<String, Object>();
//           viewObjects.put("templateName", "removeUser.ftl");
//           viewObjects.put("users", toJSON(mod.sendUsersId()));
//           return new ModelAndView(viewObjects, "main.ftl");
//        }, new FreeMarkerEngine());
//
//        put("/removeUser/:id", (request, response) -> {
//            String id = request.params(":id");
//            Map<String, Object> viewObjects = new HashMap<String, Object>();
//            if(mod.removeUser(id)) return "User Removed";
//            else return "No Such User Found";
//        });
//
//        get("/updateUser", (request, response) -> {
//           Map<String, Object> viewObjects = new HashMap<String, Object>();
//           viewObjects.put("templateName", "updateForm.ftl");
//           return new ModelAndView(viewObjects, "main.ftl");
//        }, new FreeMarkerEngine());
//
//        post("/updateUser", (request, response) -> {
//            ObjectMapper mapper = new ObjectMapper();
//            try {
//                User u = mapper.readValue(request.body(), User.class);
//                if (!u.isValid()) {
//                    response.status(400);
//                    return "Correct the fields";
//                }
//                if(!mod.checkUser(u.getId())) {
//                    int id = mod.updateUser(u.getId(), u.getFirstName(), u.getMiddleName(), u.getLastName(),
//                    u.getAge(), u.getGender(), u.getPhone(), u.getZip());
//                    response.status(200);
//                    response.type("application/json");
//                    return id;
//                }
//                else {
//                    response.status(404);
//                    return "User Does Not Exists";
//                }
//                } catch (JsonParseException jpe) {
//                    response.status(404);
//                    return "Exception";
//                }
//        });

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
            System.err.println(e);
        }
        return null;
    }

}
