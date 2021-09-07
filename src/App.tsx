import 'typeface-roboto';
import React, {FC} from 'react';
import { Provider } from 'react-redux';
import RootNavigator from './router/rootRouter';
import configureStore, { history } from './store/store';
import {QueryClientProvider} from 'react-query';
import {Loading, Modal} from './components';
import {queryClient} from './react-query.config';
import './App.css';

const App: FC<{}> = () => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <Modal />
      <Loading />
        <QueryClientProvider client={queryClient}>
            <RootNavigator history={history}/>
        </QueryClientProvider>
    </Provider>
  );
}

export default App;
