
import { fromJS } from 'immutable';
import activityListReducer from '../reducer';

describe('activityListReducer', () => {
  it('returns the initial state', () => {
    expect(activityListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
