import objectAssign from 'object-assign';
import * as actionTypes from '../../constants/directMessage/friend';

const initialState = {
  capsules: []
};

export default function userDirectMessageReducer(state = initialState) {

      return objectAssign({}, state, {
        capsules: [{id: "12312", subject: "My heart is broken", description: "Whe left me oh nooooooo no non o no no no no no no no  no no no no no no maiiiiiii"}, 
        {id: "12312", subject: "My heart is broken", description: "Whe left me oh nooooooo no non o no no no no no no no  no no no no no no maiiiiiii"},
        {id: "12312", subject: "My heart is broken", description: "Whe left me oh nooooooo no non o no no no no no no no  no no no no no no maiiiiiii"}],
      });
}

