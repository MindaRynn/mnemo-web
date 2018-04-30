import * as timeCapsuleActions from './timeCapsule';
import * as mediaActions from './media';
import * as tagActions from './tag';

export const profileActions = {
  ...timeCapsuleActions,
  ...mediaActions,
  ...tagActions
};