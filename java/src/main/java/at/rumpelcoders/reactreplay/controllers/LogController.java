package at.rumpelcoders.reactreplay.controllers;

import at.rumpelcoders.reactreplay.models.UILog;
import at.rumpelcoders.reactreplay.repositories.UILogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by chzellot on 22.02.17.
 */
@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:3000")
public class LogController {

    UILogRepository uiLogRepository;

    @Autowired
    public LogController(UILogRepository uiLogRepository) {
        this.uiLogRepository = uiLogRepository;
    }

    @RequestMapping(value = "/log", method = RequestMethod.POST)
    public List<UILog> saveLog(@RequestParam String token, @RequestBody UILog[] uiLogList) {
        ArrayList<UILog> saved = new ArrayList<>();
        for (UILog uiLog : uiLogList) {
            uiLog.setToken(token);
            saved.add(uiLogRepository.save(uiLog));
        }
        return saved;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<UILog> list(@RequestParam String token) {
        return uiLogRepository.findByToken(token);
    }

    @RequestMapping(value = "/listsessions", method = RequestMethod.GET)
    public List<String> listsessions() {
        return uiLogRepository.findAllTokens();
    }


}
