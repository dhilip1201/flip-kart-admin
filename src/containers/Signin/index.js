import React,{useState, useEffect} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {login} from "../../actions/auth.actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();


  const userLogin= (e)=>{

    e.preventDefault();
    const user= {
      // email: "admin@gmail.com",
      // password:"123456"
      email,password
    }
    // dispatch(login(auth));
    dispatch(login(user));
  }

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }

  
  return (
    <Layout>
      <Container>
      <p className="userMessage">{user.message}</p>
        <Row style={{ marginTop: "60px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event)=> setEmail(event.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
