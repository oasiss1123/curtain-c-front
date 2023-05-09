import { Button, Input, Form, DatePicker, Checkbox, Space, Card } from "antd";

import { Container } from "react-bootstrap";

import React, { useState, useRef } from "react";

import axios from "axios";

const Records_new = () => {
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [dark_price, setDark_price] = useState(0);
  const [ocpa_price, setOcpa_price] = useState(0);
  const [rail_dark_price, setRail_dark_price] = useState(0);
  const [rail_ocpa_price, setRail_ocpa_price] = useState(0);

  const [values, setValues] = useState({});

  const onFinish = () => {
    console.log("Received values of form:", values);
    axios
      .post("http://rhome19.thddns.net:5524/api/test1/create", values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.assign("/");
        }
      });
  };

  const calculate = (values) => {
    // console.log(values);
    const newDatas = {
      width: parseFloat(values.width),
      height: parseFloat(values.height),
      price: parseFloat(values.price),
      pattern: parseFloat(values.pattern),
      rail: parseFloat(values.rail_price),
      ocpa: values.ocpacity_curtain_price
        ? parseFloat(values.ocpacity_curtain_price)
        : 0,
      dark: values.dark_curtain_price
        ? parseFloat(values.dark_curtain_price)
        : 0,
    };

    // console.log(newDatas);
    axios
      .post("http://rhome19.thddns.net:5524/api/calculator", newDatas)
      .then((res) => {
        console.log(res.data);
        setAmount(res.data.amount);
        setTotal(res.data.total);
        setDark_price(res.data.dark_curtain_price);
        setOcpa_price(res.data.ocpa_curtain_price);
        setRail_dark_price(res.data.rail_dark_sum);
        setRail_ocpa_price(res.data.rail_ocpa_sum);

        const newValues = {
          qty: values.qty,
          customer_address: values.customer_address,
          customer_company: values.customer_company,
          customer_email: values.customer_email,
          customer_name: values.customer_name,
          customer_tax: values.customer_tax,
          customer_tel: values.customer_tel,
          date: values.date,
          rooms_name: values.rooms_name,
          curtain_name: values.curtain_name,
          width: parseFloat(values.width),
          height: parseFloat(values.height),
          pattern: parseFloat(values.pattern),
          curtain_front_size: parseFloat(values.frontSpace),
          rail_price: parseFloat(values.rail_price),
          ocpacity_curtain_price: values.ocpacity_curtain_price
            ? parseFloat(values.ocpacity_curtain_price)
            : 0,
          dark_curtain_price: values.dark_curtain_price
            ? parseFloat(values.dark_curtain_price)
            : 0,
          amount: res.data.amount,
          total: res.data.total,
          dark_price: res.data.dark_curtain_price,
          ocpa_price: res.data.ocpa_curtain_price,
          rail_dark_price: res.data.rail_dark_sum,
          rail_ocpa_price: res.data.rail_ocpa_sum,
        };

        setValues(newValues);
        console.log("newValues", newValues);
      });
  };

  return (
    <div className="sarabun">
      <Container>
        <Form
          name="dynamic_form_nest_item"
          onFinish={calculate}
          autoComplete="off"
        >
          <div style={{ textAlign: "left" }}>
            <h3 style={{ marginTop: "15px" }}>สร้างคำสั่งซื้อใหม่</h3>

            <hr />
            <h4>ส่วนข้อมูลของลูกค้า</h4>
            <label>Quotation No.</label>
            <Form.Item
              name="qty"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุเลขที่อ้างอิงใบเสนอราคา",
                },
              ]}
            >
              <Input
                placeholder="Quotation No."
                className="form-control mt-1"
              />
            </Form.Item>

            <label>ชื่อ</label>
            <Form.Item
              name="customer_name"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุชื่อ",
                },
              ]}
            >
              <Input placeholder="ระบุชื่อ" className="form-control mt-1" />
            </Form.Item>

            <label>ที่อยู่</label>
            <Form.Item
              name="customer_address"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุที่อยู่",
                },
              ]}
            >
              <Input placeholder="ระบุที่อยู่" className="form-control mt-1" />
            </Form.Item>

            <label>เบอร์โทร</label>
            <Form.Item
              name="customer_tel"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุเบอร์โทร",
                },
              ]}
            >
              <Input placeholder="ระบุเบอร์โทร" className="form-control mt-1" />
            </Form.Item>

            <label>ที่อยู่ Email</label>
            <Form.Item name="customer_email">
              <Input placeholder="Email" className="form-control mt-1" />
            </Form.Item>

            <label>บริษัท</label>
            <Form.Item name="customer_company">
              <Input
                placeholder="ระบุชื่อบริษัท"
                className="form-control mt-1"
              />
            </Form.Item>

            <label>เลขประจำตัวผู้เสียภาษี</label>
            <Form.Item name="customer_tax">
              <Input
                placeholder="ระบุเลขประจำตัวผู้เสียภาษี"
                className="form-control mt-1"
              />
            </Form.Item>

            <label>วันที่เสนอราคา</label>
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "โปรดเลือกวันที่จากปฏิทิน",
                },
              ]}
            >
              <DatePicker
                placeholder="เลือกวันที่"
                className="form-control mt-1"
              />
            </Form.Item>
            <hr />
            <h4>ส่วนข้อมูลผ้าม่าน</h4>

            <label>ชื่อห้อง</label>
            <Form.Item
              name="rooms_name"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุชื่อห้อง",
                },
              ]}
            >
              <Input placeholder="ระบุชื่อห้อง" className="form-control mt-1" />
            </Form.Item>

            <label>แบบผ้าม่าน</label>
            <Form.Item
              name="curtain_name"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุแบบผ้าม่าน",
                },
              ]}
            >
              <Input
                placeholder="ระบุแบบผ้าม่าน"
                className="form-control mt-1"
              />
            </Form.Item>

            <label>ความกว้างที่วัดได้ (เมตร)</label>
            <Form.Item
              name="width"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุความกว้างของพื้นที่ติดตั้ง โดยใช้หน่วยเมตร",
                },
              ]}
            >
              <Input
                placeholder="ระบุความกว้าง"
                className="form-control mt-1"
              />
            </Form.Item>

            <label>ความสูงที่วัดได้ (เมตร)</label>
            <Form.Item
              name="height"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุความสูงของพื้นที่ติดตั้ง โดยใช้หน่วยเมตร",
                },
              ]}
            >
              <Input placeholder="ระบุความสูง" className="form-control mt-1" />
            </Form.Item>

            <label>ล็อคลอน</label>
            <Form.Item
              name="pattern"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุล็อคลอนที่ใช้",
                },
              ]}
            >
              <Input placeholder="ล็อคลอน" className="form-control mt-1" />
            </Form.Item>

            <label>หน้าผ้า</label>
            <Form.Item
              name="frontSpace"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุหน้าผ้า",
                },
              ]}
            >
              <Input placeholder="ระบุหน้าผ้า" className="form-control mt-1" />
            </Form.Item>

            <label>ราคาราง/เมตร</label>
            <Form.Item
              name="rail_price"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุราคาราง",
                },
              ]}
            >
              <Input placeholder="ระบุราคาราง" className="form-control mt-1" />
            </Form.Item>

            <label>ราคาผ้าโปร่ง/เมตร</label>

            <Form.Item name="ocpacity_curtain_price">
              <Input
                placeholder="ระบุราคาผ้าโปร่ง"
                className="form-control mt-1"
              />
            </Form.Item>

            <label>ราคาผ้าทึบ/เมตร</label>

            <Form.Item name="dark_curtain_price">
              <Input
                placeholder="ระบุราคาผ้าทึบ"
                className="form-control mt-1"
              />
            </Form.Item>

            <Form.Item>
              <Space
                size={20}
                style={{ float: "right", marginBottom: 10, marginTop: 10 }}
              >
                <Button type="primary" htmlType="submit">
                  คำนวนราคา
                </Button>
              </Space>
            </Form.Item>

            {amount ? (
              <>
                <Card
                  title="รายละเอียดที่คำนวนราคาแล้วได้ดังนี้"
                  headStyle={{ fontSize: "32px" }}
                  size="default"
                  style={{
                    width: 513,
                  }}
                >
                  <table style={{ width: 350, fontSize: "24px" }}>
                    <tr>
                      <td>จำนวนผ้าทั้งหมด</td>
                      <td> {amount}</td>
                      <td>ชิ้น</td>
                    </tr>
                    <tr>
                      <td>ราคาผ้าทึบ</td>
                      <td> {dark_price}</td>
                      <td>บาท</td>
                    </tr>
                    <tr>
                      <td>ราคาผ้าโปร่ง</td>
                      <td> {ocpa_price}</td>
                      <td>บาท</td>
                    </tr>
                    <tr>
                      <td>ราคารางผ้าทึบ</td>
                      <td> {rail_dark_price}</td>
                      <td>บาท</td>
                    </tr>
                    <tr>
                      <td>ราคารางผ้าโปร่ง</td>
                      <td> {rail_ocpa_price}</td>
                      <td>บาท</td>
                    </tr>
                    <tr>
                      <td>สรุปราคา</td>
                      <td> {total}</td>
                      <td>บาท</td>
                    </tr>
                  </table>

                  <Button
                    danger
                    type="text"
                    style={{
                      marginTop: "5px",
                      color: "white",
                      backgroundColor: "#3EC400",
                      float: "right",
                    }}
                    onClick={onFinish}
                  >
                    บันทึกคำสั่งซื้อ
                  </Button>
                </Card>
              </>
            ) : (
              ""
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Records_new;
