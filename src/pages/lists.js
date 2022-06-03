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

// let id = 0;
// function createData(DNI, surname, fat, carbs, protein) {
// 	id += 1;
// 	return { id, DNI, surname, fat, carbs, protein };
// }
const customColumnStyle = {
    width: "200px",
};
const Lists = props => {

	const { classes } = props;
	const [list, setList] = useState([]);
	const [lastPage, setLastPage] = useState(false);
	const [amountToShow, setAmountToShow] = useState(13);
	const [page, setPage] = useState(1);
	const [studentsAll, setStudentsAll] = useState([]);
	const [students, setStudents] = useState([]);
	const [tutors, setTutors] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const studentsList = await getAll("student");
			const tutorsList = await getAll("tutor");
			console.log(studentsList)
			console.log(tutorsList)
			setStudentsAll(studentsList)
			setTutors(tutorsList)
			let studentsToShow = []
			for (let index = 0; index < amountToShow; index++) {
				studentsToShow[index]	=  	studentsList[index]
			}
			setStudents(studentsToShow)
			if(studentsList.length < 8)
				setLastPage(true)
		}
		fetchData();
		// list.map(item => (
		// 	rows.createData(item.DNI)
		// ))
	},[]);

	const changePage = (nextOrBack) =>{ 
		let newPage 
		console.log(page)
		if(nextOrBack === "next"){
			newPage = page + 1 
		}	else {
			newPage = page - 1 
		}
		console.log(newPage)
		let final = amountToShow * newPage
		let initial = final - amountToShow
		let studentsToShow = []
		console.log(initial)
		console.log(final)
		console.log(studentsAll.length)
		if(final >= studentsAll.length ){
			setLastPage(true)
			final = studentsAll.length
		}	else{
			setLastPage(false)
		}
		if(initial >= studentsAll.length){
			setLastPage(true)
			return
		}
		for (let index = initial; index < final; index++) {
			studentsToShow[index]	=  	studentsAll[index]
		}
		setStudents(studentsToShow)
		setPage(newPage)
		
	}

	const findTutorData = (DNI, datoToFind) =>{ 
		let tutorFounded = tutors.find(element => element.tutor.DNI == parseInt(DNI))
		console.log(tutorFounded)
		if(tutorFounded !== undefined)
			return tutorFounded.tutor[datoToFind]
	}

	return(
		<div className="overflow-hidden" align="center">
			<GlobalCss />
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>
			<h2 align="center"><b>Listado de alumnos y sus tutores</b></h2>
			<p className='text-2xl' align="left">Hoja {page}</p>
				<div style={{width: 1800}} align="center">
				<Table className={classes.table}>
					<TableHead>
					<TableRow>
						<TableCell><p style={{width: 30}}><b>DNI</b></p></TableCell>
						<TableCell align="left"><p style={{width: 90}}><b>APELLIDO</b></p></TableCell>
						<TableCell align="left"><p style={{width: 90}}><b>NOMBRE</b></p></TableCell>
						<TableCell align="left"><p style={{width: 50}}><b>FECHA DE NACIMIENTO</b></p></TableCell>
						<TableCell align="left"><p style={{width: 20}}><b>CURSO</b></p></TableCell>
						<TableCell align="left" ><p style={{width: 80}}><b>DOMICILIO</b></p></TableCell>
						<TableCell align="left"><p style={{width: 80}}><b>LOCALIDAD</b></p></TableCell>
						<TableCell align="left"><b>TELÉFONO</b></TableCell>
						<TableCell align="left"><p style={{width: 30}}><b>DNI DE TUTOR</b></p></TableCell>
						<TableCell align="left"><p style={{width: 90}}><b>NOMBRE DE TUTOR</b></p></TableCell>
						<TableCell align="left"><p style={{width: 90}}><b>APELLIDO DEL TUTOR</b></p></TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{students.length !== 0 && (
							students.map(row => (
									<TableRow key={row.student.id}>
										{/* <TableCell component="th" scope="row">
											{row.student.DNI}
										</TableCell> */}
										{/* <TableCell align="left" className>{row.student.surname}</TableCell>
										<TableCell align="left">{row.student.name}</TableCell>
										<TableCell align="left">{row.student.birthday}</TableCell>
										<TableCell align="left">{row.student.course}</TableCell>
										<TableCell align="left">{row.student.domicile}</TableCell>
										<TableCell align="left">{row.student.location}</TableCell>
										<TableCell align="left" width="100px">{row.student.telephone}</TableCell>
										<TableCell align="left">{row.student.tutor}</TableCell>
										<TableCell align="left">{findTutorData(row.student.tutor, "name")}</TableCell>
										<TableCell align="left">{findTutorData(row.student.tutor, "surname")}</TableCell> */}
										<TableCell component="th" scope="row" >
											<p style={{width: 30}}>{row.student.DNI}</p>
										</TableCell>
										<TableCell align="left"><p style={{width: 90}}>{row.student.surname}</p></TableCell>
										<TableCell align="left" ><p style={{width: 90}}>{row.student.name}</p></TableCell>
										<TableCell align="left"><p style={{width: 50}}>{row.student.birthday}</p></TableCell>
										<TableCell align="left"><p style={{width: 25}}>{row.student.course}</p></TableCell>
										{/* <TableCell align="left" style={customColumnStyle}>{row.student.domicile}</TableCell> */}
										<TableCell align="left"><p style={{width: 80}}>{row.student.domicile}</p></TableCell>
										<TableCell align="left"><p style={{width: 80}}>{row.student.location}</p></TableCell>
										<TableCell align="left" width="100px"><p style={{width: 130}}>{row.student.telephone}</p></TableCell>
										<TableCell align="left"><p style={{width: 30}}>{row.student.tutor}</p></TableCell>
										<TableCell align="left"><p style={{width: 90}}>{findTutorData(row.student.tutor, "name")}</p></TableCell>
										<TableCell align="left"><p style={{width: 90}}>{findTutorData(row.student.tutor, "surname")}</p></TableCell>

									</TableRow>
								
								))
								)
							}
					</TableBody>
				</Table>
				</div>
			<div align="center">
				{ page !== 1 && <h3 className='nextOrBackPage' onClick={() => changePage('back') }> {`< Retroceder página`} </h3> }
				{ !lastPage && <h3 className='nextOrBackPage' onClick={() => changePage('next') }>Avanzar página > </h3>  }
			</div>
		</div>
	)
}

Lists.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(Lists)  ;