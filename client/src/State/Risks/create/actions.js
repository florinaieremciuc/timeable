// ACTIONS ----------------------------------------
export const CREATE_RISK_REQUEST = 'CREATE_RISK_REQUEST';
export const CREATE_RISK_SUCCESS = 'CREATE_RISK_SUCCESS';
export const CREATE_RISK_FAILURE = 'CREATE_RISK_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createRiskAttempt = (
  description,
  category,
  probability,
  impact,
  response,
  project,
) => ({
  type: CREATE_RISK_REQUEST,
  description,
  category,
  probability,
  impact,
  response,
  project,
});
export const createRiskSuccess = (
  id,
  description,
  category,
  probability,
  impact,
  response,
  project,
) => ({
  type: CREATE_RISK_SUCCESS,
  id,
  description,
  category,
  probability,
  impact,
  response,
  project,
});
export const createRiskFailure = error => ({
  type: CREATE_RISK_FAILURE,
  error,
});
