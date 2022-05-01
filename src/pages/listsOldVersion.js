/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* LISTADOS*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import { getAll } from "../db/functions/dbUtils";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

const styles = theme => ({
	root: {
	  width: '100%',
	  marginTop: theme.spacing.unit * 3,
	  overflowX: 'auto',
	},
	table: {
	  minWidth: 700,
	},
});

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiTableCell-root': {
		borderBottom: '1px dashed rgb(4 3 3)' ,
    },
  },
})(() => null);

let id = 0;
function createData(DNI, surname, fat, carbs, protein) {
	id += 1;
	return { id, DNI, surname, fat, carbs, protein };
}
const customColumnStyle = {
    width: "200px",
};
const Lists = props => {

	const { classes } = props;
	const [list, setList] = useState([]);
	const [rows, setRows] = useState([]);
	const [tutors, setTutors] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const params = await getAll("student");
			const params2 = await getAll("tutor");
			console.log(params)
			console.log(params2)
			// setList(params)
			let arrayOfParams = []
			let i = 0
			params.map(item => (
				arrayOfParams.push({id: i, DNI: item.student.DNI, surname: item.student.surname, name: item.student.name, birthday: item.student.birthday, course: item.student.course,  domicile: item.student.domicile, location: item.student.location , telephone: item.student.telephone, tutor: item.student.tutor} ),
				i++
			))
			console.log(arrayOfParams)
			setRows(arrayOfParams)
			setTutors(params2)
		}
		fetchData();
		// list.map(item => (
		// 	rows.createData(item.DNI)
		// ))
	},[]);

	const findTutorData = (DNI, datoToFind) =>{ 
		let tutorFounded = tutors.find(element => element.tutor.DNI == parseInt(DNI))
		console.log(tutorFounded)
		if(tutorFounded !== undefined)
			return tutorFounded.tutor[datoToFind]
	}

	return(
		<div align="center" >
			<GlobalCss />
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>

			<Table className={classes.table}>
				<TableHead>
				<TableRow>
					<TableCell><b>DNI</b></TableCell>
					<TableCell align="left"><b>Apellido</b></TableCell>
					<TableCell align="left"><b>Nombre</b></TableCell>
					<TableCell align="left"><b>Fecha de nacimiento</b></TableCell>
					<TableCell align="left"><b>Curso</b></TableCell>
					<TableCell align="left" ><b>Domicilio</b></TableCell>
					<TableCell align="left"><b>Localidad</b></TableCell>
					<TableCell align="left"><b>Teléfono</b></TableCell>
					<TableCell align="left"><b>DNI de Tutor</b></TableCell>
					<TableCell align="left"><b>Nombre del Tutor</b></TableCell>
					<TableCell align="left"><b>Apellido del Tutor</b></TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{rows.length !== 0 && (
						rows.map(row => (
						
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.DNI}
									</TableCell>
									<TableCell align="left" >{row.surname}</TableCell>
									<TableCell align="left">{row.name}</TableCell>
									<TableCell align="left">{row.birthday}</TableCell>
									<TableCell align="left">{row.course}</TableCell>
									{/* <TableCell align="left" style={customColumnStyle}>{row.domicile}</TableCell> */}
									<TableCell align="left">{row.domicile}</TableCell>
									<TableCell align="left">{row.location}</TableCell>
									<TableCell align="left" width="100px">{row.telephone}</TableCell>
									<TableCell align="left">{row.tutor}</TableCell>
									<TableCell align="left">{findTutorData(row.tutor, "name")}</TableCell>
									<TableCell align="left">{findTutorData(row.tutor, "surname")}</TableCell>
								</TableRow>
							
						))
					)
				}
				</TableBody>
			</Table>
		
		</div>
	)
}

Lists.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(Lists)  ;