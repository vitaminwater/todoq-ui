
import { fromJS } from 'immutable';
import settingsEditActivityReducer from '../reducer';

describe('settingsEditActivityReducer', () => {
  it('returns the initial state', () => {
    expect(settingsEditActivityReducer(undefined, {})).toEqual(fromJS({}));
  });
});
