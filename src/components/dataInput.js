import TextField from '@material-ui/core/TextField';
import { search } from "../db/functions/dbUtils";

const DataInput =  (props) => {
    //filter input
    const handleData = (e) =>	{
        props.setErr(false)
		props.setData({ ...props.state, [e.target.id]: e.target.value})
	}

    const handleKeyDown = async (event) => {
        //array that establishes the order if fields
        let orderOfFields = ["name", "course", "domicile", "location", "birthday", "telephone", "DNItutor", "surnameTutor", "nameTutor"]
        props.setErr(false)
        if(event.key === 'Enter') {
            if(props.id == "surname"){
                //verifying characters allowed
                if(evaluateCharacters(event.target.value))
                    props.document.getElementById(orderOfFields[0]).focus();
            }
            if(props.id == "name"){
                //verifying characters allowed
                if(evaluateCharacters(event.target.value) && evaluateCharacters(props.document.getElementById("surname").value))
                    props.document.getElementById(orderOfFields[1]).focus()
                    // props.submit()
            }
            if(props.id == "course"){
                props.document.getElementById(orderOfFields[2]).focus()
            }
            if(props.id == "domicile"){
                props.document.getElementById(orderOfFields[3]).focus()
            }
            if(props.id == "location"){
                props.document.getElementById(orderOfFields[4]).focus()
            }
            if(props.id == "birthday"){
                props.document.getElementById(orderOfFields[5]).focus()
            }
            if(props.id == "telephone"){
                props.document.getElementById(orderOfFields[6]).focus()
            }
            if(props.id == "DNItutor"){
                let existsTutor =  await search("tutor", props.document.getElementById(orderOfFields[6]).value)
                //verify if exitis previus text in inputs
                if(props.document.getElementById(orderOfFields[7]).value === "" && props.document.getElementById(orderOfFields[8]).value === ""){
                    //verify if exitis tutor in database
                    if(existsTutor.exitence === 0){
                        props.document.getElementById(orderOfFields[7]).focus()
                    }	else{
                        //filling the inputs with the text
                        console.log(existsTutor.data.tutor.surname)
                        console.log(existsTutor.doc.id)
                        props.document.getElementById(orderOfFields[7]).value = existsTutor.data.tutor.surname
                        props.document.getElementById(orderOfFields[8]).value = existsTutor.data.tutor.name
                        props.setData({ 
                            ...props.state, 
                            surnameTutor: existsTutor.data.tutor.surname, 
                            nameTutor: existsTutor.data.tutor.name
                        })
                    }
                }   else{
                    props.setConfirmationMode(true)
                }
            }
            if(props.id == "surnameTutor"){
                if(evaluateCharacters(event.target.value) && evaluateCharacters(props.document.getElementById("surnameTutor").value))
                    props.document.getElementById(orderOfFields[8]).focus()
            }
            if(props.id == "nameTutor"){
                if(evaluateCharacters(event.target.value) && evaluateCharacters(props.document.getElementById("nameTutor").value))
                    props.setConfirmationMode(true)
            }
		}
        if(
            (
                event.key !== 'Enter' && 
                event.key !== 'Alt' && 
                event.key !== 'Tab' && 
                event.key !== 'Shift' && 
                event.key !== 'Control' && 
                event.keyCode !== 37  && 
                event.keyCode !== 38  &&  
                event.keyCode !== 39  && 
                event.keyCode !== 40  && 
                event.target.value.length === 30 
            ) 
            && 
            (props.id === "surname" || props.id === "name")
        ) {
            props.setErr(`El ${props.name} no puede tener más de 30 caracteres`)
		}        
	}

    const evaluateCharacters = (dataToEvaluate) =>	{
        let allowedCharacters = ["q","w","e","r","t","y","u","ü","i","o","p","a","s","d","f","g","h","j","k","l","ñ","z","x","c","v","b","n","m","á","é","í","ó","ú"," ","'","-"]
        
        for (let index = 0; index < dataToEvaluate.length; index++) {
            let validations = allowedCharacters.map((allowedLetter) => {
                if(dataToEvaluate.charAt(index).toLowerCase() ===  allowedLetter){
                    return true
                } else {
                    return false
                }
            })

            let coincidence = validations.some(a => a === true);

            if(!coincidence){
                window.scrollTo(0,document.body.scrollHeight);
                props.setErr('Ingresó al menos un caracter no permitido')
                return false
            }
        }
        return true
	}
   
    return(
        <div align="left" className="box-input">
            <h3 className="text-2xl">{props.field}:</h3>
            <div className="-mt-3 ml-4 mb-8 text-7xl" >
                <TextField 
                    id={props.id}
                    variant="outlined"
                    name={props.name}
                    onChange={handleData}
                    type={props.type}
                    autoFocus={props.autoFocus}
                    onKeyDown={handleKeyDown} 
                    // value={ (props.name === "DNI del tutor/a" || props.name === "Apellido del tutor/a") ? "-" : props.state[props.id]}
                    value={props.state[props.id]}
                    className="w-85"
                    InputProps={{
                        style: {fontSize: '1.3rem'},
                        inputProps: { maxLength: 30 }
                    }}
                    disabled={props.disabled ? true : false}
                />
            </div>
        </div>
    )
}

export default DataInput