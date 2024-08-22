import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../../services/helper';

const Tables = ({ userdata,deleteUser }) => {
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Summary</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata && userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{element.name}</td>
                          <td>{element.summary}</td>
                          <td className='img_parent'>
                            <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >
                                  <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                    <i className="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item >
                                  <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                    <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item >
                                    <div onClick={() => deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                    }) : (
                      <tr>
                        <td colSpan="5" className='text-center'>No Data Found</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
}

export default Tables;
