import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Create from './pages/create'
import KeyEntry from './pages/keyEntry'
import Lists from './pages/lists/lists'
import ListsIndex from './pages/lists/listsIndex'
import End from './pages/end'
import './styles/utils.css'

const Routes = () => {
	return (			
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={ Home } />					
				<Route exact path='/ingresoClave/:operationNumber' component={ KeyEntry } />					
				<Route exact path='/alumnoAlta/:DNI' component={ Create } />					
				<Route exact path='/lists/:listType' component={ Lists } />					
				<Route exact path='/lists-index' component={ ListsIndex } />					
				<Route exact path='/fin' component={ End } />					
			</Switch>
		</BrowserRouter>
	)
}

export default Routes ; 