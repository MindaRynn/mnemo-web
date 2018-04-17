import * as timeCapsulesActions from './timeCapsule';
import * as memoryBoxesActions from './memoryBox';
import * as mediaActions from './media';

export const timeCapsuleActions = {
  ...timeCapsulesActions,
  ...memoryBoxesActions,
  ...mediaActions
};