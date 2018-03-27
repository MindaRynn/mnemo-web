import * as friendActions from './friend';
import * as roomActions from './room';

export const userDirectMessageActions = {
  ...friendActions,
  ...roomActions
};