import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-crop/dist/ReactCrop.css'
import { RouterProvider } from 'react-router-dom';
import { routerConfig } from './routers/index.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.ts';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <RecoilRoot>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={routerConfig} />
            </PersistGate>
          </Provider>
      </RecoilRoot>
    </MantineProvider>
  </React.StrictMode>,
)
