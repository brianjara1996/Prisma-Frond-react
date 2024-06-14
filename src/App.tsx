import ReactDOM from 'react-dom'
import './index.css'
import SearchCoupons from './components/movusuComponents/searchCoupons'


const App = () => (
    <SearchCoupons/>
)

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
