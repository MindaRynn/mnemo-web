import * as tagActions from './tag';
import * as timeCapsuleActions from './timeCapsule';
import * as mediaActions from './media';
import * as userActions from './user';

export const feedActions = {
  ...tagActions,
  ...timeCapsuleActions,
  ...mediaActions,
  ...userActions
};
