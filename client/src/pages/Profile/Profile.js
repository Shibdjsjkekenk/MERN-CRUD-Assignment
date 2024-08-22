import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import CardBody from 'react-bootstrap/esm/CardBody'
import Row from 'react-bootstrap/esm/Row'
import { singleUsergetfunc } from "../../services/Apis"
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../services/helper'
import moment from "moment"

const Profile = () => {

  const [userprofile, setUserProfile] = useState({});

  const { id } = useParams();

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);

    if (response.status === 200) {
      setUserProfile(response.data)
    } else {
      console.log("error");
    }
  }

  useEffect(() => {
    userProfileGet();
  }, [])

  return (
    <>

      <div className='container'>
        <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
          <CardBody>
            <Row>
              <div className='col'>
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt="" />
                </div>
              </div>
            </Row>

            <div className='text-center'>
              <h3>{userprofile.name}</h3>
              <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:- <span>{userprofile.summary}</span> </h4>
              <h5><i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Created&nbsp;:- <span>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</span> </h5>
              <h5> <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Updated&nbsp;:- <span>{userprofile.dateUpdated}</span> </h5>
            </div>
          </CardBody>

        </Card>
      </div>

    </>
  )
}

export default Profile