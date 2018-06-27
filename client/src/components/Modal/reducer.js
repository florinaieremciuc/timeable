import { MODAL_OPEN, MODAL_CLOSE } from './action';

export default function (state = null, action) {
  switch (action.type) {
  case MODAL_OPEN:
    return true;
  case MODAL_CLOSE:
    return false;
  default:
    return state;
  }
}
