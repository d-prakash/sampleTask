import './App.css';
import { Table } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid';


const App = ()=>{

  const [formValues,setFormValues] = useState({
    firstname:"",
    lastname:"",
    phone:''
  })

  const [errors,setErrors] = useState({})
  const [isSubmit,setIsSubmit] = useState(false)
  const [userData,setUserData] = useState([])

const handleChange = e =>{
  const {name,value} = e.target
  setFormValues({...formValues,[name]:value,id:uuidv4()})

  
}
 

const handleSubmit = (e) =>{
  e.preventDefault()
 setIsSubmit(true)
 setErrors(validate(formValues))
 const newData = {...formValues}
 setUserData([...userData,newData])
 setFormValues({
  firstname:"",
  lastname:"",
  phone:''
})

}

const handleDelete = (itemId) =>{
  const filterData = [...userData]
  const index = filterData.findIndex((itemData) =>itemData.id === itemId)
  console.log(index)
  filterData.splice(index,1)
  setUserData(filterData)
  
}

const validate=(values)=>{
  const errors = {}
  const nameRegex = /^([^0-9]*)$/
  if(!values.firstname){
    errors.firstname = "this filed is required"
  }
  else if(!values.firstname.match(nameRegex)){
    errors.firstname = "first name should contain only characters"
  }
  if(!values.lastname){
    errors.lastname = "this filed is required"
  }
  else if(!values.lastname.match(nameRegex)){
    errors.lastname = "last name should contain only characters"
  }
  if(!values.phone){
    errors.phone = "this filed is required"
  }
  else if(values.phone.length <10 || values.phone.length > 10 ){
    errors.phone = "phone number should contain only 10"
  }
  return errors
}

  
  return (
    <Container fluid>
      <div className="row">
          <div className="col-md-8 offset-md-2">
              <br /><br />
                <h3 className='text-center'>Phone Book</h3><br />
                <Table striped bordered hover className="w-100">
                    <thead >
                      <tr><th>First Name</th>
                          <th>Last Name</th>
                          <th>Phone Number</th>
                    </tr>
                    </thead>
                  {Object.keys(errors).length === 0 && isSubmit && Object.keys(userData).length !== 0?(
                    <tbody>
                    {userData.map((eachData) =>{
                      return(<tr key={eachData.id}><td>{eachData.firstname}</td>
                      <td>{eachData.lastname}</td>
                      <td>{eachData.phone}</td>
                      <td><input type='button' value="Delete" onClick={handleDelete} /></td></tr>)
                    } )}
                    </tbody>):<div className="text-center">Nothing Added</div>}
                  </Table>
          </div>
      </div>

    <div className='row'>
      <div className='col'>
      <Form onSubmit={handleSubmit} className='d-flex flex-row justify-content-center align-items-center text-center'>
        <Form.Group controlId="form.Name" className='d-flex flex-row align-items-center  w-8'>
              <Form.Label className="font-label">FirstName</Form.Label>
              <Form.Control type="text" name="firstname" placeholder="Enter first name" value={formValues.firstname} onChange={handleChange}/>
        </Form.Group>
       <span>{errors.firstname}</span>

       <Form.Group controlId="form.LastName" className='d-flex  w-8'>
              <Form.Label className="font-label">LastName</Form.Label>
              <Form.Control type="text" name="lastname"  placeholder="Enter last name" value={formValues.lastname} onChange={handleChange}/>
        </Form.Group>
        <span>{errors.lastname}</span>
        <Form.Group controlId="form.Phone" className='d-flex  tex-center'>
              <Form.Label className="font-label">Phone</Form.Label>
              <Form.Control type="tel" name="phone" placeholder="Enter phone number" value={formValues.phone} onChange={handleChange}/>
        </Form.Group>
        <span>{errors.phone}</span>
        <Button type="submit" className="button">Add Contact</Button>
      </Form>
      </div></div>
</Container>
  );
}

export default App;
