import ReactDOM from 'react-dom/client'

import App from './App'

let counter_JsCode = 1;

ReactDOM.createRoot(document.getElementById('root')).render(
    <App counter = {counter_JsCode} />
)