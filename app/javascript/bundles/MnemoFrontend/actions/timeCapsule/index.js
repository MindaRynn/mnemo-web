import * as timeCapsulesActions from './timeCapsule';
import * as memoryBoxesActions from './memoryBox';
import * as mediaActions from './media';
import * as tagActions from './tag';

export const timeCapsuleActions = {
  ...timeCapsulesActions,
  ...memoryBoxesActions,
  ...mediaActions,
  ...tagActions
};