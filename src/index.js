import  React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
import registerServiceWorker from './registerServiceWorker';

//CSS STYLESHEETS
import "simple-line-icons/css/simple-line-icons.css"
// import "./assets/fontAwesome/css/all.min.css"
import "./styles/coreui/coreui.css"
// import "@coreui/icons/css/coreui-icons.css"
import './styles/index.css';

ReactDOM.render(<Popup />, document.getElementById('root'));
registerServiceWorker();
