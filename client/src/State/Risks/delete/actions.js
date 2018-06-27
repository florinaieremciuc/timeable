// ACTIONS ----------------------------------------
export const DELETE_RISK_REQUEST = 'DELETE_RISK_REQUEST';
export const DELETE_RISK_SUCCESS = 'DELETE_RISK_SUCCESS';
export const DELETE_RISK_FAILURE = 'DELETE_RISK_FAILURE';

// ACTION CREATORS ----------------------------------------
export const deleteRiskAttempt = id => ({
  type: DELETE_RISK_REQUEST,
  id,
});
export const deleteRiskSuccess = success => ({
  type: DELETE_RISK_SUCCESS,
  success,
});
export const deleteRiskFailure = error => ({
  type: DELETE_RISK_FAILURE,
  error,
});
