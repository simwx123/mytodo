import React from 'react';
import App from '../App';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {render, cleanup, fireEvent, waitFor} from 'react-native-testing-library';

afterEach(cleanup);

describe('<App />', () => {
  const mockStore = configureStore([]);
  it('Add button onclick and ist value', async() => {
    const store = mockStore({todo: [{id:1, isCompleted: false, todo: "Exercise"}]});
    const rendered = render(
      <Provider store={store}><App /></Provider>
    );

    const buttonComponent = rendered.getByTestId('addbutton');
    fireEvent(buttonComponent, 'onPressOut');

    await waitFor(() => expect(rendered.queryByTestId('listdata')).toBeTruthy())
    expect(rendered.getByTestId('listdata').props.children).toBe(
      'Exercise'
    )
  });
});