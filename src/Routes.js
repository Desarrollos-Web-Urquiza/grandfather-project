import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/home'
import Create from './components/create'
import './styles/utils.css'

const Routes = () => {
	return (			
		<BrowserRouter>
			<Switch>
				{/*Home*/}
				<Route exact path='/' component={ Home } />					
				<Route exact path='/alumnoAlta' component={ Create } />					
			</Switch>
		</BrowserRouter>
	)
}

export default Routes ; 