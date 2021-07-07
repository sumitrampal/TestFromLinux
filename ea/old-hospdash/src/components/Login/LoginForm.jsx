import React, { useState } from "react";
import "./LoginForm.css";
import { Form, Col, Button, Spinner,InputGroup } from "react-bootstrap";
import { apiUrl } from "../../config.json";
import axios from "axios";
import { useHistory } from 'react-router-dom';


const LoginForm = (props) => {


const [validated, setValidated] = useState(false);
let history = useHistory();
const [loading, setLoading] = useState(false);
const [show,setshow] = useState();
const [input, setInput] = useState({
  hospitalId: "",
  password: "",
});

React.useEffect(()=>{
  if(localStorage.getItem("hospitaldashtoken")) 
    props.history.history.push('/dashboard')
}, [])
const handleChange = (e) => {
  const { name, value } = e.target;
  setInput({ ...input, [name]: value });
};

async function handleSubmit(event) {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/newhospitals/preboard/signin`,
        {
          hospitalId: input.hospitalId,
          password: input.password,
        },
      );

     console.log(response);

   localStorage.setItem("hospitaldashtoken",response.data.Token)
   localStorage.setItem("hospitalId", response.data.Id)
   localStorage.setItem('hospitalName', response.data.Name)
   localStorage.setItem('hospitalEmail', response.data.email)
      if (response.data.Status === 1) {
        history.push("/dashboard");
      }
      else {
        history.push("/")
      }
    }
    catch (error) {
      if (error.response) {
        // console.log(error.response);
        if (error.response.data.Status === 0) {
          document.getElementById("pswd-err").style.display = "block";
          document.getElementById("pswd-err").innerText =
            error.response.data.Error;
        }
      }

    }
    setLoading(false);
  }

  setValidated(true);
}
const handlePasswordClick = ()=>{
  document.getElementById('password').getAttribute('type')==='password'?  document.getElementById('password').setAttribute('type','text'):
  document.getElementById('password').setAttribute('type','password')



}
return (


  <div className="header-background">
    {/* <img className="logo" src={require("../../Assets/logo.png")} alt="logo" /> */}
    <div className="login-box">
      <div className="title">Admin Log In</div>



      <Form
        noValidate validated={validated} 
        onSubmit={handleSubmit}
      >
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Control 
            required
            type="number"
            name="hospitalId"
            value={input.hospitalId}
            onChange={handleChange}
            placeholder="Hospital Id"
            min="1"
          />
          <Form.Control.Feedback type="invalid">
            Please enter email id
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <InputGroup className="mb-3">
          <Form.Control
            required
            name="password"
            value={input.password}
            onChange={handleChange}
            type="password"
            placeholder="**********"
            id="password"
            aria-describedby="pa"
            aria-label="Password"
          />
          <InputGroup.Append>
                <Button variant="secondary" onClick={handlePasswordClick}><i className="fa fa-eye"/></Button>
            </InputGroup.Append>
            </InputGroup>
          <Form.Control.Feedback type="invalid">
            Please enter password
            </Form.Control.Feedback>
        </Form.Group>
        <p id="pswd-err" style={{ color: "red" }}>
          Wrong Password
          </p>
        <Button
          className="login_button"
          type="submit">
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              variant="danger"
            />
          )}
          <span>Log In</span>
        </Button>
      </Form>
    </div>
  </div>
);
};

export default LoginForm;



// {
//   headers: {
//     'Authorization': 'Bearer' + localStorage.getItem (data.Token)
//        'Accept' : 'application/json',
//        'Content-Type': 'application/json'
//   }
// }
