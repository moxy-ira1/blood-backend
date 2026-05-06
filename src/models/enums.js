const USER_ROLES = {
  OWNER: 'owner',
  WORKER: 'worker',
  DONOR: 'donor',
};

const ELIGIBILITY = {
  ELIGIBLE: 'eligible',
  NOT_ELIGIBLE: 'not_eligible',
};

const INVENTORY_STATUS = {
  AVAILABLE: 'available',
  EXPIRED: 'expired',
  DISCARDED: 'discarded',
};

const AUDIT_ACTIONS = {
  CREATE_DONATION: 'CREATE_DONATION',
  CREATE_BLOOD_TEST: 'CREATE_BLOOD_TEST',
  UPDATE_USER: 'UPDATE_USER',
  INVENTORY_UPDATE: 'INVENTORY_UPDATE',
  SEND_MESSAGE: 'SEND_MESSAGE',
  AUTH_LOGIN: 'AUTH_LOGIN',
};

const AUTH_METHOD_TYPES = {
  ID_NUMBER: 'id_number',
  PHONE_NUMBER: 'phone_number',
  EMAIL: 'email',
};

module.exports = {
  USER_ROLES,
  ELIGIBILITY,
  INVENTORY_STATUS,
  AUDIT_ACTIONS,
  AUTH_METHOD_TYPES,
};

