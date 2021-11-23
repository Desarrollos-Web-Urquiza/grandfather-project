import { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const DataInput =  (props) => {
    //filter input
    const handleData = (e) =>	{
        props.setErr(false)
		console.log(e.target.value)
		console.log(e.target.name)
		console.log(props.setData)
		props.setData({ ...props.state, [e.target.name]: e.target.value})
        // window.dispatchEvent(new KeyboardEvent('keydown', {
        //     key: "e",
        //     keyCode: 69,
        //     code: "KeyE",
        //     which: 69,
        //     shiftKey: false,
        //     ctrlKey: false,
        //     metaKey: false
        // }));
	}

    
    const handleKeyDown = (event) => {
		// if (event.key === 'Enter') {
		// 	props.submit()
		// }

        if (event.key === 'Enter') {
			// props.inputRef.current.focus();
            if(props.id == "surname"){
                props.document.getElementById("name").focus();
            }
            if(props.id == "name"){
                props.submit()
            }
		}
	}
    
    const inputRef = useRef(null);
        
    const theme = createTheme({
        typography: {
            TextField: {
            fontSize: '10rem',
        },
        },
    });

    return(
        <div align="left" className="box-input">
            <h3 className="text-2xl">{props.field}:</h3>
            <div className="-mt-2 ml-4 mb-8 text-2xl" >
                <ThemeProvider theme={theme}>
                    <TextField 
                        id={props.id}
                        variant="outlined"
                        name={props.name}
                        onChange={handleData}
                        type={props.type}
                        autoFocus={props.autoFocus}
                        onKeyDown={handleKeyDown} 
                        className="text-2xl w-80"
                        
                    />
                </ThemeProvider>
            </div>
        </div>
    )
}

export default DataInput