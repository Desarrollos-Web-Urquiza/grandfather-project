import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';	
import { firestore } from "../bd/firebase/FirebaseConfig";

const CardSelect = withStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
    width: 400,
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(Card);

const Create = props => {

	const [name, setName] = useState(null);
	const [secuence, setSecuence] = useState({
		initial: null,
		final: null
	})

	return(
	
		<div>
			<Helmet>
				<title>Grandfather project - Alta</title>
			</Helmet>
			<h1 align="center" style={{marginLeft: 5}}>Alta</h1>
			<div  align="center" style={{marginTop: 150}}>
				<div className="card-container">
				<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
					<h2 style={{marginTop: 15}}>Crear alumno</h2>
					<br />
					<br />		
					<div align="left" className="box-input">
						<h3>DNI:</h3>
						<div style={{marginTop: 15, marginLeft: 10 }} >
							<TextField 
								
							/>
						</div>
					</div>
					<div align="left" className="box-input">
						<h3>Apellido:</h3>
						<div style={{marginTop: 15, marginLeft: 10 }} >
							<TextField 
								
							/>
						</div>
					</div>
					<div align="left" className="box-input">
						<h3>Nombre:</h3>
						<div style={{marginTop: 10, marginLeft: 10 }} >
							<TextField 
								
							/>
						</div>
					</div>
					<Button style={{marginTop: 60, marginLeft: 10 }} variant="contained" color="primary" onClick={()=> {props.history.push('/alumnoAlta')}}>
						Crear alumno
					</Button>
				</CardSelect>
			</div>
			</div>
		</div>
	)
}

export default  Create  ;