package at.rumpelcoders.reactreplay.controllers;

import at.rumpelcoders.reactreplay.models.RecordingSession;
import at.rumpelcoders.reactreplay.models.UserAction;
import at.rumpelcoders.reactreplay.repositories.RecordingSessionRepository;
import at.rumpelcoders.reactreplay.repositories.UserActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by chzellot on 22.02.17.
 */
@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:3000")
public class LogController {

    UserActionRepository userActionRepository;

    RecordingSessionRepository recordingSessionRepository;

    @Autowired
    public LogController(UserActionRepository userActionRepository, RecordingSessionRepository recordingSessionRepository) {
        this.userActionRepository = userActionRepository;
        this.recordingSessionRepository = recordingSessionRepository;
    }

    @RequestMapping(value = "/log", method = RequestMethod.POST)
    public List<UserAction> saveLog(@RequestParam String token, @RequestBody UserAction[] userActionList) {
        createRecording(token);
        ArrayList<UserAction> saved = new ArrayList<>();
        for (UserAction userAction : userActionList) {
            userAction.setRecordingSessionId(token);
            saved.add(userActionRepository.save(userAction));
        }
        return saved;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<UserAction> list(@RequestParam String token) {
        return userActionRepository.findByRecordingSessionIdOrderByTimestamp(token);
    }

    @RequestMapping(value = "/listrecordings", method = RequestMethod.GET)
    public List<RecordingSession> listsessions() {
        return recordingSessionRepository.findAllByOrderByTimestampDesc();
    }

    @Transactional
    private void createRecording(String token) {
        try {
            RecordingSession recordingSession = recordingSessionRepository.findOne(token);
            if (recordingSession == null) {
                recordingSession = new RecordingSession();
                recordingSession.setId(token);
                recordingSession.setTimestamp(new Date());
                recordingSession = recordingSessionRepository.save(recordingSession);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
