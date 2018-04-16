import * as timeCapsulesActions from './timeCapsule';
import * as memoryBoxesActions from './memoryBox';

export const timeCapsuleActions = {
  ...timeCapsulesActions,
  ...memoryBoxesActions
};