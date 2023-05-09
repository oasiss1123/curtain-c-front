import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Form, DatePicker, Checkbox, Card } from "antd";
import { FilePdfOutlined, LoadingOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import moment from "moment";

const RecordEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [dark_price, setDark_price] = useState(0);
  const [ocpa_price, setOcpa_price] = useState(0);
  const [rail_dark_price, setRail_dark_price] = useState(0);
  const [rail_ocpa_price, setRail_ocpa_price] = useState(0);
  const [data, setData] = useState({});
  const [componentDisabled1, setComponentDisabled1] = useState(true);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [values, setValues] = useState({});
  const [status, setStatus] = useState(0);
  const [bt, setBt] = useState(0);

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
          curtain_front_size: parseFloat(values.curtain_front_size),
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
      });

    setStatus(1);
  };

  const onFinish = () => {
    if (status === 0) {
      window.alert("Please Save First!");
    } else {
      axios
        .put(`http://rhome19.thddns.net:5524/api/test1/edit/${id}`, values)
        .then((res) => {
          console.log(res);
          if (res.status === 500) {
            window.location.assign("/");
          }
        });
      window.location.assign("/");
    }

    setBt(1);
  };

  // const update = (value, values) => {
  //   const newDatas = {
  //     width: parseFloat(values.width),
  //     height: parseFloat(values.height),
  //     price: parseFloat(values.price),
  //     pattern: parseFloat(values.pattern),
  //     rail: parseFloat(values.rail_price),
  //     ocpa: values.ocpacity_curtain_price
  //       ? parseFloat(values.ocpacity_curtain_price)
  //       : 0,
  //     dark: values.dark_curtain_price
  //       ? parseFloat(values.dark_curtain_price)
  //       : 0,
  //   };

  //   // console.log(newDatas);
  //   axios
  //     .post("http://rhome19.thddns.net:5524/api/calculator", newDatas)
  //     .then((res) => {
  //       console.log(res.data);
  //       setAmount(res.data.amount);
  //       setTotal(res.data.total);
  //       setDark_price(res.data.dark_curtain_price);
  //       setOcpa_price(res.data.ocpa_curtain_price);
  //       setRail_dark_price(res.data.rail_dark_sum);
  //       setRail_ocpa_price(res.data.rail_ocpa_sum);
  //     });
  // };

  useEffect(() => {
    axios.get(`http://rhome19.thddns.net:5524/api/test1/${id}`).then((res) => {
      console.log(res.data);
      setData(res?.data);
      setAmount(res.data.amount);
      setTotal(res.data.total);
      setDark_price(res.data.dark_price);
      setOcpa_price(res.data.ocpa_price);
      setRail_dark_price(res.data.rail_dark_price);
      setRail_ocpa_price(res.data.rail_ocpa_price);
    });
  }, []);

  form.setFieldsValue({
    qty: data.qty,
    customer_address: data.customer_address,
    customer_company: data.customer_company,
    customer_email: data.customer_email,
    customer_name: data.customer_name,
    customer_tax: data.customer_tax,
    customer_tel: data.customer_tel,
    date: moment(data.date),
    rooms_name: data.rooms_name,
    curtain_name: data.curtain_name,
    width: parseFloat(data.width),
    height: parseFloat(data.height),
    pattern: parseFloat(data.pattern),
    frontSpace: parseFloat(data.curtain_front_size),
    rail_price: parseFloat(data.rail_price),
    ocpacity_curtain_price: data.ocpacity_curtain_price
      ? parseFloat(data.ocpacity_curtain_price)
      : 0,
    dark_curtain_price: data.dark_curtain_price
      ? parseFloat(data.dark_curtain_price)
      : 0,
  });

  const pdf = () => {
    window.alert("อยู่ระหว่างการพัฒนา");
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            textAling: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "90vh",
          }}
        >
          {/* <LoadingScreen
            loading={true}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
          /> */}
          <LoadingOutlined
            style={{ fontSize: "100px", marginTop: "10px", color: "#003049" }}
          />
        </div>
      ) : (
        <Container>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            // onValuesChange={update}
            onFinish={calculate}
            autoComplete="off"
          >
            <div style={{ textAlign: "left" }} className="sarabun">
              <Button onClick={pdf} style={{ marginTop: 15, marginBottom: 15 }}>
                Export PDF
                <FilePdfOutlined />
              </Button>
              <h3>แก้ไขคำสั่งซื้อ</h3>
              <hr />
              <h4>ส่วนข้อมูลของลูกค้า</h4>
              <label>Quotation No.</label>
              <Form.Item name="qty">
                <Input
                  placeholder="Quotation No."
                  rules={[
                    {
                      required: true,
                      message: "โปรดระบุเลขที่อ้างอิงใบเสนอราคา",
                    },
                  ]}
                  defaultValue={data.qty}
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
                <Input
                  placeholder="ระบุที่อยู่"
                  className="form-control mt-1"
                />
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
                <Input
                  placeholder="ระบุเบอร์โทร"
                  className="form-control mt-1"
                />
              </Form.Item>

              <label>ที่อยู่ Email</label>
              <Form.Item name="customer_email">
                <Input placeholder="ระบุ Email" className="form-control mt-1" />
              </Form.Item>

              <label>บริษัท</label>
              <Form.Item name="customer_company">
                <Input placeholder="ระบุบริษัท" className="form-control mt-1" />
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
                <Input
                  placeholder="ระบุชื่อห้อง"
                  className="form-control mt-1"
                />
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

              <label>ความกว้างที่วัดได้_เมตร</label>
              <Form.Item
                name="width"
                rules={[
                  {
                    required: true,
                    message:
                      "โปรดระบุความกว้างของพื้นที่ติดตั้ง โดยใช้หน่วยเมตร",
                  },
                ]}
              >
                <Input placeholder="Width" className="form-control mt-1" />
              </Form.Item>

              <label>ความสูงที่วัดได้_เมตร</label>
              <Form.Item
                name="height"
                rules={[
                  {
                    required: true,
                    message: "โปรดระบุความสูงของพื้นที่ติดตั้ง โดยใช้หน่วยเมตร",
                  },
                ]}
              >
                <Input placeholder="Height" className="form-control mt-1" />
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
                <Input
                  placeholder="ระบุล็อคลอน"
                  className="form-control mt-1"
                />
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
                <Input
                  placeholder="ระบุหน้าผ้า"
                  className="form-control mt-1"
                />
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
                <Input
                  placeholder="ระบุราคาราง"
                  className="form-control mt-1"
                />
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
                <Button
                  type="primary"
                  style={{ float: "right", marginBottom: 5, marginTop: 10 }}
                  htmlType="submit"
                >
                  อัพเดท
                </Button>
              </Form.Item>

              {amount ? (
                <>
                  <Card
                    title="รายละเอียดที่คำนวนราคาแล้วได้ดังนี้"
                    headStyle={{ fontSize: "32px" }}
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

                    {status === 1 ? (
                      <>
                        {bt === 1 ? (
                          <Button
                            style={{
                              fontWeight: "bold",
                              float: "right",
                              borderTopLeftRadius: 4,
                              borderTopRightRadius: 4,
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                              color: "white",
                              backgroundColor: "#24CE2A",
                              marginBottom: 10,
                            }}
                          >
                            <LoadingOutlined />
                          </Button>
                        ) : (
                          <Button
                            danger
                            type="text"
                            style={{
                              marginTop: "5px",
                              float: "right",
                              color: "white",
                              backgroundColor: "#3EC400",
                            }}
                            onClick={onFinish}
                          >
                            บันทึกการแก้ไข
                          </Button>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </Card>
                </>
              ) : (
                ""
              )}
            </div>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default RecordEdit;
