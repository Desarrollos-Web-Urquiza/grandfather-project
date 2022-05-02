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
	const [students, setStudents] = useState([]);
	const [tutors, setTutors] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const studentsList = await getAll("student");
			const tutorsList = await getAll("tutor");
			console.log(studentsList)
			console.log(tutorsList)
			setStudents(studentsList)
			setTutors(tutorsList)
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
		<div className="overflow-hidden">
			<GlobalCss />
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>

			{students.length !== 0 && (
					students.map(row => (
						<div className='itemList'>
							<p><b>DNI:</b></p>
							<p className='ml-2'>{row.student.DNI}</p>
							<p className='ml-4 mr-2'><b>Apellido/s:</b></p>
							{/* <p className='mr-4'>{row.student.surname}</p> */}
							<div className='w-40 ml-4' style={{marginLeft: 400}}>Martin Carlos Agustin Cristoph</div>
							<p><b>Nombre/s:</b></p>
							<p>{row.student.name}</p>
							<p><b>Curso:</b></p>
							<p>{row.student.course}</p>
							<p><b>Domicilio:</b></p>
							<p>{row.student.domicile}</p>
							<p><b>Localidad:</b></p>
							<p>{row.student.location}</p>
							<p><b>Fecha de nacimiento:</b></p>
							<p>{row.student.birthday}</p>
							<p><b>Teléfono:</b></p>
							<p>{row.student.telephone}</p>
							<p><b>DNI del tutor/a:</b></p>
							<p>{row.student.tutor}</p>
							<p><b>Apellido del tutor/a:</b></p>
							<p>{findTutorData(row.student.tutor, "name")}</p>
							<p><b>Nombre del tutor/a:</b></p>
							<p>{findTutorData(row.student.tutor, "surname")}</p>
						</div>
					))
				)
			}
		</div>
	)
}

Lists.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(Lists)  ;