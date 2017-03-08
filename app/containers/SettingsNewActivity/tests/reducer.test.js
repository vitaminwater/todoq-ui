
import { fromJS } from 'immutable';
import settingsNewActivityReducer from '../reducer';

describe('settingsNewActivityReducer', () => {
  it('returns the initial state', () => {
    expect(settingsNewActivityReducer(undefined, {})).toEqual(fromJS({}));
  });
});
