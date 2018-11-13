import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './authedUser';

const AUTHED_USER_ID = 'johndoe';

export function handleInitialData() {
  return dispatch => {
    getInitialData().then(({ users, questions }) => {
      console.log('Users: ', users);
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_USER_ID));
    });
  };
}
