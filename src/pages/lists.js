/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* LISTADOS*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import { getAll } from "../db/functions/dbUtils";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
	const [amountToShow, setAmountToShow] = useState(5);
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
		<div className="overflow-hidden">
			<GlobalCss />
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>
			<h2 align="center"><b>Listado de alumnos y sus tutores</b></h2>
			<p className='text-2xl'>Hoja {page}</p>
			{students.length !== 0 && (
					students.map(row => (
						<div className='itemList'>
							<div>
								<p><b>DNI:</b></p>
								<p className='ml-2'>{row.student.DNI}</p>
							</div>
							<div>
								<p className='ml-4 mr-2'><b>Apellido/s:</b></p>
								<p><div className='w-85 ml-2'>{row.student.surname}</div></p>
							</div>
							<div>
								<p><b>Nombre/s:</b></p>
								<p><div className='w-85 ml-2'> {row.student.name} </div></p>
							</div>
							<div>
								<p><b>Curso:</b></p>
								<p>{row.student.course}</p>
							</div>
							<div>
								<p><b>Domicilio:</b></p>
								<p>{row.student.domicile}</p>
							</div>
							<div>
								<p><b>Localidad:</b></p>
								<p>{row.student.location}</p>
							</div>
							<div>
								<p><b>Fecha de nacimiento:</b></p>
								<p>{row.student.birthday}</p>
							</div>
							<div>
								<p><b>Teléfono:</b></p>
								<p>{row.student.telephone}</p>
							</div>
							<div>
								<p><b>DNI del tutor/a:</b></p>
								<p>{row.student.tutor}</p>
							</div>
							<div>
								<p><b>Apellido del tutor/a:</b></p>
								<p>{findTutorData(row.student.tutor, "name")}</p>
							</div>
							<div>
								<p><b>Nombre del tutor/a:</b></p>
								<p>{findTutorData(row.student.tutor, "surname")}</p>
							</div>
						</div>
					))
				)
			}
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