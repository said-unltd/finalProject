import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import RootLayout from './layouts/RootLayout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Collection from './pages/Collection';
import UserManagement from './pages/UserManagement';
import CreateCollection from './pages/createCollection';
import Items from './pages/Items';
import AddItem from './pages/addItem';
import ItemView from './pages/ItemView';

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout />} >
      <Route path='/' element={<App />} />
      <Route path='/addItem' element={<AddItem />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/collection/items' element={<Items />} />
      <Route path='/collection/items/view' element={<ItemView />} />
      <Route path='/createcollection' element={<CreateCollection />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/usermanagement' element={<UserManagement />} />
      <Route path='*' element={<Error />} />
    </Route>
  )

))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
