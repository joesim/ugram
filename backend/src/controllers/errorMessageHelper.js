import logger from '../common/logger';

export const errorMessage = (res, errorCode, errorMessage) => {
  res.status(errorCode);
  res.json({ message: errorMessage }).send();
};
