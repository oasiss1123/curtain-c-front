import { Navbar, Container } from "react-bootstrap";
import mainLogo from "../photos/Mantarin_haus_logo.png";
import React from "react";
import { Form, Input } from "antd";
import axios from "axios";

const Auth = () => {
  const onSubmit = (value) => {
    const newData = {
      user_name: value.username,
      password: value.password,
    };
    axios
      .post("http://rhome19.thddns.net:5524/api/login", newData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.token);
          localStorage.setItem("Token", res.data.token);
          window.location.assign("/");
        }

        if (res.status === 203) {
          window.alert(res.data.message);
        }
      });
  };

  return (
    <div>
      <div className="Auth-form-container" style={{ textAlign: "center" }}>
        <Form className="Auth-form" onFinish={onSubmit}>
          {/* <form className="Auth-form" onSubmit={onSubmit} > */}
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In to Curtain-C</h3>
            <div style={{ textAlign: "center" }}>
              <img src={mainLogo} width="50%" />
            </div>
            <div className="form-group mt-3" style={{ textAlign: "left" }}>
              <label>Username</label>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter Username"
                  className="form-control mt-1"
                />
              </Form.Item>
              {/* <input
              type="username"
              className="form-control mt-1"
              placeholder="Enter Username"
            /> */}
            </div>
            <div className="form-group mt-3" style={{ textAlign: "left" }}>
              <label>Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter Password"
                  type="password"
                  className="form-control mt-1"
                />
              </Form.Item>
              {/* <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            /> */}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-danger mb-3">
                Login
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Auth;
