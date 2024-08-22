import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Tables from '../../components/Tables/Tables';
import { addData, dltdata, updateData } from '../../components/context/ContextProvider';
import Alert from 'react-bootstrap/Alert';
import { deletfunc, userGet, usergetfunc } from '../../services/Apis';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const { update, setUpdate } = useContext(updateData)
  const { deletedata, setDLtdata } = useContext(dltdata);
  const { useradd, setUseradd } = useContext(addData);  // Ensure context is provided
  const [userdata, setUserData] = useState([]);

  const adduser = () => {
    navigate("/register");
  }

  // get user
  const userGet = async () => {
    const response = await usergetfunc();

    if (response.status === 200) {
      setUserData(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  // user delete
  const deleteUser = async (id) => {
    const response = await deletfunc(id);
    if (response.status === 200) {
      userGet();
      setDLtdata(response.data)
    } else {
      toast.error("error")
    }
  }

  useEffect(() => {
    userGet();

  }, [])

  return (
    <>
      {useradd && (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.name.toUpperCase()} Successfully Added
        </Alert>
      )}
      {
        update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.name.toUpperCase()} Succesfully Update</Alert> : ""
      }

      {
        deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.name.toUpperCase()} Succesfully Delete</Alert> : ""
      }
      <div className='container pt-5'>
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              {/* Add search functionality here if needed */}
            </div>
            <div className="add_btn pb-5">
              <Button variant="primary" onClick={adduser}>
                <i className="fa-solid fa-plus"></i>&nbsp; Add Data
              </Button>
            </div>
          </div>
          {/* export, gender, status */}

        </div>
        <Tables userdata={userdata}
        deleteUser={deleteUser} />
      </div>
    </>
  );
}

export default Home;
