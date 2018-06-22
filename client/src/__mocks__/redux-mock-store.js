import saga from 'redux-saga';
import configureMockStore from 'redux-mock-store';

const middlewares = [saga];
const mockStore = configureMockStore(middlewares);

export default mockStore;
