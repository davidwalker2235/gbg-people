import 'typeface-roboto';
import React, {FC} from 'react';
import { Provider } from 'react-redux';
import RootNavigator from './router/rootRouter';
import configureStore, { history } from './store/store';
import {QueryClientProvider} from 'react-query';
import {Loading, Modal} from './components';
import {queryClient} from './react-query.config';
import { SnackbarProvider } from 'notistack';
import {Slide} from '@material-ui/core';

const App: FC<{}> = () => {
  const store = configureStore()
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        TransitionComponent={Slide}>
        <Provider store={store}>
          <Modal />
          <Loading />
            <RootNavigator history={history}/>
        </Provider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
