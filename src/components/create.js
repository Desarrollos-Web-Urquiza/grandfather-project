import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';	
import { db } from "../bd/firebase/FirebaseConfig";
// import { firestore } from "../bd/firebase/FirebaseConfig";
// import { doc, setDoc } from "firebase/firestore"; 
// import firebase from 'firebase/app';
// import 'firebase/firestore';

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
	const [data, setData] = useState({});
	const [secuence, setSecuence] = useState({
		initial: null,
		final: null
	})
	const handleData = (e) =>	{
		console.log(e.target.value)
		console.log(e.target.name)
		setData({...data, [e.target.name]: e.target.value} )
	}
	const add = () => {
		console.log("Entró a 'Add'")
		console.log(data.DNI)
		console.log(data.name)
		console.log(data.surname)
		db.collection("grandfather-project").add({
			student:{ 
				DNI: data.DNI,
				name: data.name,
				surname: data.surname
			}
	    })
		.then(function() {
			console.log("Document written");
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
	}
	console.log(data)
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
								name="DNI"
								onChange={handleData}
								type="number"
							/>
						</div>
					</div>
					<div align="left" className="box-input">
						<h3>Apellido:</h3>
						<div style={{marginTop: 15, marginLeft: 10 }} >
							<TextField 
								name="surname"
								onChange={handleData}
							/>
						</div>
					</div>
					<div align="left" className="box-input">
						<h3>Nombre:</h3>
						<div style={{marginTop: 10, marginLeft: 10 }} >
							<TextField 
								name="name"
								onChange={handleData}
							/>
						</div>
					</div>
					<Button style={{marginTop: 60, marginLeft: 10 }} variant="contained" color="primary" onClick={() => add()}>
						Crear alumno
					</Button>
				</CardSelect>
			</div>
			</div>
		</div>
	)
}

export default  Create  ;