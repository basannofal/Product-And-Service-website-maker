import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import Product from './Routes/Products/Product';
import App from './Routes/App';
import Services from './Routes/Services/Services';
import Brand from './Routes/Brand/Brand';
import Gellary from './Routes/Gellary/Gellary';
import Slider from './Routes/Slider/Slider';


ReactDOM.render(
  <BrowserRouter>
    <Services />
    <Product />
    <Brand />
    <Gellary />
    <Slider />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)