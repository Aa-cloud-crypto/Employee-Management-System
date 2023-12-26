import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { AllRouter } from './Router/AllRouter';
import { EmpoyeePage } from './Component/Employee';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <AllRouter />
  // </React.StrictMode>
<AllRouter/>);
reportWebVitals();
