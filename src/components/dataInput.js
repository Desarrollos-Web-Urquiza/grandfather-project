import TextField from '@material-ui/core/TextField';

const DataInput =  (props) => {
    //filter input
    const handleData = (e) =>	{
        props.setErr(false)
		props.setData({ ...props.state, [e.target.id]: e.target.value})
	}

    const handleKeyDown = (event) => {
        props.setErr(false)
        if(event.key === 'Enter') {
            if(props.id == "surname"){
                //verifying characters allowed
                if(evaluateCharacters(event.target.value))
                    props.document.getElementById("name").focus();
            }
            if(props.id == "name"){
                //verifying characters allowed
                if(evaluateCharacters(event.target.value) && evaluateCharacters(props.document.getElementById("surname").value))
                    props.document.getElementById("domicile").focus()
                    // props.submit()
            }
            if(props.id == "domicile"){
                props.document.getElementById("location").focus()
            }
            if(props.id == "location"){
                props.document.getElementById("birthday").focus()
            }
            if(props.id == "birthday"){
                props.setConfirmationMode(true)
                //props.submit()
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
                    value={ (props.name === "DNI del tutor/a" || props.name === "Apellido del tutor/a") ? "-" : props.state[props.id]}
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