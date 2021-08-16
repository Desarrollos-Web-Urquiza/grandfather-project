import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';	
// import { firestore } from "../FirebaseConfig";

const CardSelect = withStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
    width: 400,
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(Card);

const Home = props => {

	const [name, setName] = useState(null);
	const [secuence, setSecuence] = useState({
		initial: null,
		final: null
	})

	return(
	
		<div>
			<Helmet>
				<title>Grandfather project - Altas, bajas, modificaciones</title>
			</Helmet>
			<h1 align="center" style={{marginLeft: 5}}>Altas, bajas, modificaciones</h1>
			<div  align="center" style={{marginTop: 150}}>
				<div className="card-container">
				<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
					<h2 style={{marginTop: 10}}>Agregar Alta</h2>
					<br />
					<br />		
					<Button variant="contained" color="primary" onClick={()=> {props.history.push('/alumnoAlta')}}>
						Crear alumno
					</Button>
				</CardSelect>
			</div>
			</div>
		</div>
	)
}

export default  Home  ;