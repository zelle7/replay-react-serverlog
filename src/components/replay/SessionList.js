/**
 * Created by chzellot on 04.02.17.
 */
import React, {PropTypes} from "react";


class SessionList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        const {sessions, onSessionClick, activeSession} = this.props;
        return (
            <div>
                <h3>Active: {activeSession} </h3>
                <select onChange={onSessionClick}>
                    {sessions.forEach(value => {
                        <option>{value}</option>
                    })}
                </select>
            </div>);
    }
}
SessionList.propTypes = {
    sessions: PropTypes.array.isRequired,
    activeSession: PropTypes.string,
    onSessionClick: PropTypes.func.isRequired,
};

SessionList.defaultProps = {
    sessions: []
};

export default SessionList;