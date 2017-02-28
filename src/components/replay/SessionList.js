/**
 * Created by chzellot on 04.02.17.
 */
import React, {PropTypes} from "react";


class SessionList extends React.Component {


    render() {
        const {sessions, onSessionClick, activeSession} = this.props;
        return (
            <div>
                <h4>Active: {activeSession} </h4>
                <ul className="" style={{overflowY: 'scroll', height: '120px'}}>
                    {sessions.map(session => {
                        return <li key={session.id} style={{
                            cursor: 'pointer',
                            color: 'blue',
                            textDecoration: 'underline'
                        }}
                                   className={activeSession === session.id ? 'active' : ''}
                                   onClick={() => {
                                       onSessionClick(session.id)
                                   }}

                        >
                            {new Date(session.timestamp).toTimeString()} {session.id}
                        </li>
                    })}
                </ul>
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