import logger from '../common/logger';

export const errorMessage = (res, errorCode, errorMessage) => {
	logger.error(errorMessage);
  res.status(errorCode);
  res.json({ message: errorMessage }).send();
};
