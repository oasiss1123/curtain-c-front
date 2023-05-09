import { Divider, Table, Button, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  FormOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { Container } from "react-bootstrap";
import LoadingScreen from "react-loading-screen";

const Records = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState(0);

  const onDelete = (params) => {
    axios
      .delete(`http://rhome19.thddns.net:5524/api/test1/delete/${params}`)
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    axios.get("http://rhome19.thddns.net:5524/api/test1").then((res) => {
      setData(res.data);
    });
  }, []);

  const [id, setId] = useState();
  const columns = [
    {
      title: "Quatation No.",
      dataIndex: "qty",
      sorter: (a, b) => a.qty.localeCompare(b.qty),
      render: (text, rec) => <a href={`/record/edit/${rec.id}`}>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "customer_name",
      sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
      render: (text, rec) => <a href={`/record/edit/${rec.id}`}>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      render: (rec) => (
        <div>
          <Button
            style={{ color: "#286efb" }}
            icon={<FormOutlined />}
            type="link"
            href={`/record/edit/${rec.id}`}
          ></Button>
          <Popconfirm
            title={`คุณต้องการลบ ${rec.qty} ?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              onDelete(rec.id);
              window.location.reload();
              message.success("Clicked on Yes");
            }}
          >
            <Button
              href={`/records`}
              style={{ color: "#FF4141", textAlign: "right" }}
              icon={<DeleteOutlined />}
              type="link"
            ></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
        <div className="sarabun">
          <div style={{ textAlign: "center" }}>
            <Container>
              <div>
                <Divider />
                {status === 1 ? (
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
                    type="link"
                    href="/records/new"
                  >
                    <LoadingOutlined />
                  </Button>
                ) : (
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
                    type="link"
                    href="/records/new"
                    onClick={() => setStatus(1)}
                  >
                    + เปิดงานใหม่
                  </Button>
                )}
                <h5>
                  ระบบคำนวนราคาผ้าม่าน <br />
                  [บริษัท มัณฑรินทร์ เฮ้าส์ จำกัด]
                </h5>
                <Table columns={columns} dataSource={data} />
              </div>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};
export default Records;
