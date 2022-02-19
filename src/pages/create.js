import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { add } from "../db/functions/dbUtils";
import DataInput from "../components/dataInput";
import TextField from '@material-ui/core/TextField';

const CardSelect = withStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
    width: 650,
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(Card);

const Create = props => {
	//data inputs
	const [data, setData] = useState({});
	const [err, setErr] = useState(false);
	const [confirmationMode, setConfirmationMode] = useState(false);	
	const [correctionMode, setCorrectionMode] = useState(false);	

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
		if(data.name === '' || typeof(data.name) == 'undefined'){
			setErr('Ingrese un nombre')
			return
		}
		if(data.name === '' || typeof(data.name) == 'undefined'){
			setErr('Ingrese un nombre')
			return
		}
		if(data.name === '' || typeof(data.name) == 'undefined'){
			setErr('Ingrese un nombre')
			return
		}
		add(data, props.history)
	}

	const confirmationDefinition = (definition) => {
		console.log("confirmationDefinition", definition)
		console.log(typeof definition)
		if(definition.target.value == 1)
			validationData()
		if(definition.target.value == 2){
			console.log("confirmationDefinition 2")
			setConfirmationMode(false)
			setCorrectionMode(true)
		}
	}

	const correctionDefinition = (definition) => {
		if(definition.target.value == 1){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("surname").focus()
			}, 300);
		}
		if(definition.target.value == 2){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("name").focus()
			}, 300);
		}
		
		if(definition.target.value == 3){
			setCorrectionMode(false)
			console.log(document.getElementById("domicile"))
				setTimeout(() => {
				document.getElementById("domicile").focus()
			}, 300);
		}
		
		if(definition.target.value == 4){
			setCorrectionMode(false)
			console.log(document.getElementById("location"))
				setTimeout(() => {
				document.getElementById("location").focus()
			}, 300);
		}
		
		if(definition.target.value == 5){
			setCorrectionMode(false)
			console.log(document.getElementById("birthday"))
				setTimeout(() => {
				document.getElementById("birthday").focus()
			}, 300);
		}
	}

	console.log(data)
	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Alta</title>
			</Helmet>
			<h2 align="center" style={{marginRight: 5}}>ALUMNADO - ALTAS</h2>
			<div  align="center" style={{marginTop: 150}}>
				<div className="card-container">	
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }}>
						{ confirmationMode && 
							<div>
								<h2>¿Datos correctos? </h2>
								<div id="div-options" align="left" className="flex flex-col justify-initial w-56">
									<p>1 Datos correctos, continuar</p>
									<p>2 Datos incorrectos, corregir</p>
								</div>
								<TextField 
									variant="outlined" 
									style={{marginBottom: 50, width: 200 }} 
									type="text"
									InputProps={{ inputProps: { min: 0, max: 4 } }}
									onChange={confirmationDefinition}
									error={err}
									autoFocus={true}
								/>
							</div>
						}
						{ correctionMode && 
							<div>
								<h2>¿Qué dato quiere corregir? </h2>
								<div id="div-options" align="left" className="flex flex-col justify-initial w-56">
									<p>1 Apellido/s</p>
									<p>2 Nombre/s</p>
									<p>3 Domicilio</p>
									<p>4 Localidad</p>
									<p>5 Fecha de nacimiento</p>
								</div>
								<TextField 
									variant="outlined" 
									style={{marginBottom: 50, width: 200 }} 
									type="text"
									InputProps={{ inputProps: { min: 0, max: 4 } }}
									onChange={correctionDefinition}
									error={err}
									autoFocus={true}
								/>
							</div>
						}
						{ (!confirmationMode && correctionMode !== true) && 
							<div>
								<h2 style={{marginTop: 15}}>Crear alumno</h2>
								<br />
								<br />		
								<div align="left" className="-mt-1 ml-2 mb-8 text-2xl box-input2">
									<p >DNI: </p> 
									<p className="mt-1" style={{fontSize: '1.3rem', marginLeft: "6rem"}}>{data.DNI} </p>
								</div>
								<DataInput 
									id="surname"
									field="Apellido/s" 
									setData={setData} 
									type={"text"} 
									name={"apellido"} 
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
									name={"nombre"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="domicile"
									field="Domicilio" 
									setData={setData} 
									type={"text"} 
									name={"domicilio"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="location"
									field="Localidad" 
									setData={setData} 
									type={"text"} 
									name={"localidad"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="birthday"
									field="Fecha de nacimiento" 
									setData={setData} 
									type={"date"} 
									name={"fecha de nacimiento"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
									setConfirmationMode={setConfirmationMode}
								/>
							</div>
						}
						{err && <b><p style={{color: "red"}}> {err} </p></b> }	
						<br />	
						
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default Create