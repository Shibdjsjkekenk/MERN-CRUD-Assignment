import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../services/helper';
import { editfunc, singleUsergetfunc } from '../../services/Apis';
import { updateData } from '../../components/context/ContextProvider';

const Edit = () => {
  const [inputdata, setInputData] = useState({
    name: "",
    summary: ""
  });
console.log(inputdata)
  const [imgdata,setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const {update,setUpdate} = useContext(updateData)

  const navigate = useNavigate();

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }


  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  const {id} = useParams();

  const userProfileGet = async()=>{
    const response = await singleUsergetfunc(id);
    
    if(response.status === 200){   
      setInputData(response.data)
      setImgdata(response.data.profile)

    }else{
      console.log("error");
    }
  }

  const submitUserData = async (e) => {
    e.preventDefault();

    const { name, summary } = inputdata;

    if (name === "") {
      toast.error(" name is Required !")
    } else if (summary === "") {
      toast.error("summary is Required !")
    } else {
     
      const data = new FormData();
      data.append("name", name)
      data.append("summary", summary)
      data.append("user_profile", image || imgdata)


      const config = {
        "Content-Type": "multipart/form-data"
      }

      const response = await editfunc(id,data,config);
      
      if(response.status === 200){
        setUpdate(response.data)
        navigate("/")
      }

    }
  }

  useEffect(()=>{
    userProfileGet();
  },[id])

    useEffect(() => {
      if (image) {
        setImgdata("")
        setPreview(URL.createObjectURL(image))
      }
    

    }, [image])


  return (
    <>
      <div className='container'>
        <h2 className='text-center mt-5'>Update Your Details</h2>
        <Card className='shadow mt-3 p-3'>
          <div className="profile_div text-center">
            <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="Profile" />
          </div>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name='name'
                value={inputdata.name}
                onChange={setInputValue}
                placeholder='Name'
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                type="text"
                name='summary'
                value={inputdata.summary}
                onChange={setInputValue}
                placeholder='Summary'
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicFile">
              <Form.Label>Select Your Profile</Form.Label>
              <Form.Control
                type="file"
                name='user_profile'
                onChange={setProfile}
                placeholder='Select Your Profile'
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitUserData}>
              Submit
            </Button>
          </Row>
        </Card>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Edit;
