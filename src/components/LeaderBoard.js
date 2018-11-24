import React from 'react';
import { connect } from 'react-redux';

const LeaderBoard = props => {
  const { leaders } = props;
  return (
    <div>
      <h3>Leader Board</h3>
      {leaders.map(leader => (
        <div>
          <h4>{leader.name}</h4>
          <p>
            <img src={leader.avatar} alt={`Avatar for ${leader.name}`} />
          </p>
          <p>Answered questions: {leader.answered}</p>
          <p>Created questions: {leader.created}</p>
          <p>
            <strong>Score:</strong> {leader.score}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

function mapStateToProps({ users, questions, authedUser }) {
  const leadersArr = Object.values(users);
  const leaders = leadersArr
    .map(user => ({
      name: user.name,
      avatar: user.avatarURL,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
      score: Object.keys(user.answers).length + user.questions.length
    }))
    .sort((a, b) => b.score - a.score);
  return {
    leaders
  };
}

export default connect(mapStateToProps)(LeaderBoard);
