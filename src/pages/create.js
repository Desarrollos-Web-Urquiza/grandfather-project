import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { add } from "../db/functions/dbUtils";
import DataInput from "../components/dataInput";
import TextField from '@material-ui/core/TextField';
import { useRef } from 'react';

const CardSelect = withStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
    width: 480,
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(Card);

const Create = props => {
	//data inputs
	const [data, setData] = useState({});
	const [err, setErr] = useState(false);

	useEffect(() => {
		let semiParams = window.location.href.split('/')
		let paramsFinished = semiParams[4]
		setData({...data, DNI: paramsFinished})
	},[]);

	const validationData = () => {
		if(data.surname === '' || typeof(data.surname) == 'undefined'){
			setErr('Ingrese un apellido')
			document.getElementById("surname").focus();
			return
		}	
		if(data.surname.length > 30){
			setErr('El apellido no puede tener más de 30 caracteres')
			return
		}
		if(data.name === '' || typeof(data.name) == 'undefined'){
			setErr('Ingrese un nombre')
			return
		}
		if(data.name.length > 30){
			setErr('El nombre no puede tener más de 30 caracteres')
			return
		}
		add(data, props.history)
	}

	const handleKeyDown = (event) => {
		// if (event.key === 'Enter') {
		// 	props.submit()
		// }

        if (event.key === 'Enter') {
			document.getElementById("input2").focus();
			console.log(inputRef)
			console.log(document.getElementById("input2"))
		}
	}

	const inputRef = useRef(null);

	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Alta</title>
			</Helmet>
			<h2 align="center" style={{marginRight: 5}}>ALUMNADO - ALTAS</h2>
			<div  align="center" style={{marginTop: 150}}>
				<div className="card-container">	
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
						<h2 style={{marginTop: 15}}>Crear alumno</h2>
						<br />
						<br />		
						<div align="left" className="flex flex-wrap justify-initial -mt-1 ml-2 mb-8 text-2xl">
							<p>DNI: </p> 
							<p className="ml-20 mt-1 text-base">{data.DNI} </p>
						</div>
						<DataInput 
							id="surname"
							field="Apellido/s" 
							setData={setData} 
							type={"text"} 
							name={"surname"} 
							state={data} 
							setErr={setErr} 
							autoFocus={true} 
							submit={validationData} 
							document={document}
						/>
						<DataInput 
							id="name"
							field="Nombre/s" 
							setData={setData} 
							type={"text"} 
							name={"name"} 
							state={data} 
							setErr={setErr} 
							submit={validationData} 
						/>
						{err && <p style={{color: "red"}}> {err} </p> }	
						<br />		
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default Create