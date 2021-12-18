import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { add } from "../db/functions/dbUtils";
import DataInput from "../components/dataInput";

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
						/>
						{err && <b><p style={{color: "red"}}> {err} </p></b> }	
						<br />		
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default Create