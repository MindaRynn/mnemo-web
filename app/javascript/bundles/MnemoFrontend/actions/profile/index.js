import * as timeCapsuleActions from './timeCapsule';
import * as mediaActions from './media';
import * as tagActions from './tag';
import * as userActions from './user';

export const profileActions = {
  ...timeCapsuleActions,
  ...mediaActions,
  ...tagActions,
  ...userActions
};