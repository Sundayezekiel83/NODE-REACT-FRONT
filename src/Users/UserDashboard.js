import React, {useEffect, useState} from 'react'
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon,MDBCardText,MDBCardBody,MDBCard, MDBCardFooter, MDBCardHeader, MDBCardGroup } from "mdbreact";
import {Zoom} from 'react-reveal';
import classes from './users.module.css'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {isAunthenticated, aunthenticate} from '../auth/auth'
import {getPurchaseHistory} from '../Users/ApiUser'
import Flip from 'react-reveal'
const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
      user: { _id, name, email, role }
  } = isAunthenticated();
  const token = isAunthenticated().token;

  const init = (userId, token) => {
      getPurchaseHistory(userId, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setHistory(data);
          }
      });
  };

  useEffect(() => {
      init(_id, token);
  }, []);

  const userLinks = () => {
      return (
          <div className="card bg-success">
              <h4 className="card-header">User Links</h4>
              <ul className="list-group">
                  <li className="list-group-item">
                      <Link className="nav-link" to="/carts">
                          My Cart
                      </Link>
                  </li>
                  <li className="list-group-item">
                      <Link className="nav-link" to={`/profile/${_id}`}>
                          Update Profile
                      </Link>
                  </li>
              </ul>
          </div>
      );
  };

  const userInfo = () => {
      return (
          <div className="card mb-5 bg-info">
              <h3 className="card-header">User Information</h3>
              <ul className="list-group">
                  <li className="list-group-item">{name}</li>
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">
                      {role === 1 ? "Admin" : "Registered User"}
                  </li>
              </ul>
          </div>
      );
  };

  const purchaseHistory = history => {
      return (
          <div className="card mb-5 bg-info ">
              <h3 className="card-header">Purchase history</h3>
              <ul className="list-group">
                  <li className="list-group-item">
                      {history.map((h, i) => {
                          return (
                              <div>
                                  <hr />
                                  {h.product.map((p, i) => {
                                      return (
                                          <div key={i}>
                                              <h6>Product name: {p.name}</h6>
                                              <h6>
                                                  Product price: ${p.price}
                                              </h6>
                                              <h6>
                                                  Purchased date:{" "}
                                                  {moment(
                                                      p.createdAt
                                                  ).fromNow()}
                                              </h6>
                                          </div>
                                      );
                                  })}
                              </div>
                          );
                      })}
                  </li>
              </ul>
          </div>
      );
  };

  return (
          <Flip left>
          <div className="row mt-3">
              <div className="col-sm-9 col-md-4">{userLinks()}</div>
              <div className="col-sm-9 col-md-8 mt-2">
                  {userInfo()}
                  {purchaseHistory(history)}
              </div>
          </div>
          </Flip>
      
  );
};
export default Dashboard;