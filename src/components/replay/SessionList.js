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
                <ul className="" style={{overflowY: 'scroll', height: '60px'}}>
                    {sessions.map(value => {
                        return <li style={{
                            cursor: 'pointer',
                            color: 'blue',
                            textDecoration: 'underline'
                        }}
                                   className={activeSession === value ? 'active' : ''}
                                   onClick={() => {
                                       onSessionClick(value)
                                   }}

                        >
                            {value}
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