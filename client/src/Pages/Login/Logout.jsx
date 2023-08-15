
import axios from "axios";
import Button from '@mui/material/Button';


function Logout(props) {

  function logMeOut() {
    axios({
      method: "POST",
      url:"http://localhost:5000/lgout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header"  style={{
          backgroundColor:'black'
        }}>
            
            <Button  variant="outlined" onClick={logMeOut}> 
                Logout
            </Button>
        </header>
    )
}

export default Logout;