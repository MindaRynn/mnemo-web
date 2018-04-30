import * as tagActions from './tag';
import * as timeCapsuleActions from './timeCapsule';
import * as mediaActions from './media';

export const feedActions = {
  ...tagActions,
  ...timeCapsuleActions,
  ...mediaActions
};
