import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import { registerfunc } from "../../services/Apis"
import {useNavigate} from "react-router-dom"
import { registerfunc } from '../../services/Apis';
import { addData } from '../../components/context/ContextProvider';

const Register = () => {

  const [inputdata, setInputData] = useState({
    name: "",
    summary: "",

  });

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  const submitUserData = async(e) => {
    e.preventDefault();

    const { name, summary } = inputdata;

    if (name === "") {
      toast.error(" Name is Required !")
    } else if (summary === "") {
      toast.error("Summary is Required !")
     
    } else {

      const data = new FormData();
      data.append("name", name)
      data.append("summary", summary)
      data.append("user_profile", image)

      const config = {
        "Content-Type": "multipart/form-data"
      }

      const response = await registerfunc(data, config);
    
      if(response.status === 200){
        setInputData({
          ...inputdata,
          name:"",
          summary: ""
       
        });
        setImage("");
        navigate("/");
        setUseradd(response.data)
      }else{
        toast.error("Error!")
      }
    }
  }
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
  }, [image])

  return (
    <>
      <div className='container'>
        <h2 className='text-center mt-5'>
          Add Your Details
        </h2>
        <Card className='shadow mt-3 p-3'>
          <div className="profile_div text-center">
            <img src={preview ? preview : "/man.png"} alt="img" />
          </div>

          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>  Name</Form.Label>
              <Form.Control type="text" name='name' value={inputdata.name} onChange={setInputValue} placeholder='Name' />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Summary</Form.Label>
              <Form.Control type="text" name='summary' value={inputdata.summary} onChange={setInputValue} placeholder='Summary' />
            </Form.Group>
            
          
         
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select Your Profile</Form.Label>
              <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
            </Form.Group>
           
            <Button variant="primary" type="submit" onClick={submitUserData}>
              Submit
            </Button>
          </Row>
        </Card>
        <ToastContainer position="top-center" />

      </div>
    </>
  )
}

export default Register