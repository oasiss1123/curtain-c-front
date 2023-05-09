import Welcome from "./components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth";
import Order from "./components/Order";
import Records from "./components/Records";
import RecordEdit from "./components/RecordEdit";
import Records_new from "./components/Records_new";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import mainLogo from "./photos/Mantarin_haus_logo.png";
import { Divider, Table, Popconfirm, message } from "antd";
import PDFGenerete from "./components/PDFGenerete";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import "antd/dist/antd.css";
import { useState } from "react";
import Logout from "./components/Logout";
import Footer from "./components/Footer";

function App() {
  const token = localStorage.getItem("Token");
  const [status, setStatus] = useState(0);

  if (!token) {
    return (
      <>
        <Navbar className="color-nav" variant="light">
          <Container>
            <Navbar.Brand href="/" style={{ color: "white" }}>
              <img
                alt=""
                src={mainLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Curtain-C @ Mantarin-Haus
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Auth />
      </>
    );
  }
  return (
    <div>
      <Navbar className="color-nav" variant="light">
        <Container>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            <img
              alt=""
              src={mainLogo}
              width="30"
              height="30"
              className="d-inline-block align-top sarabun"
            />{" "}
            Curtain-C @ Mantarin-Haus
          </Navbar.Brand>
          <Form className="d-flex">
            <Button
              size="sm"
              type="button"
              href="/logout"
              variant="outline-danger"
            >
              Log Out
            </Button>
          </Form>
        </Container>
      </Navbar>

      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Records />} />
          <Route path="/order" element={<Order />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/record/edit/:id" element={<RecordEdit />} />
          <Route path="/records/new" element={<Records_new />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
