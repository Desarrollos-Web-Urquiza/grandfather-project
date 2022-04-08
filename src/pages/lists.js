/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* LISTADOS*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { search } from "../db/functions/dbUtils";

const Lists = props => {

	const [operationNumber, setOperationNumber] = useState(null);	

	useEffect(() => {
		
	},[]);

	return(
		<div align="center" className="mainCenter">
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>
			Hola mundo
		</div>
	)
}

export default  Lists  ;