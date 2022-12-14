import Head from "next/head";
import {
  Input,
  Card,
  Form,
  Button,
  Row,
  Col,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

import { apiBaseUrl } from "../utils/constants";

const Home = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [form] = Form.useForm();

  const inputRef = useRef(null);
  const divRef = useRef(null);

  const fetchData = () => {
    try {
      setLoading(true);
      fetch(`${apiBaseUrl}converter/currenyCodes`)
        .then((response) => response.json())
        .then((actualData) => {
          setLoading(false);
          setData(actualData);
        })
        .catch((e) => {
          message.error(e.message);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const checkValues = async (values) => {
    try {
      setLoading(true);
      setValue(values.from);
      fetch(`${apiBaseUrl}converter/${values.from}/${values.to}`)
        .then((response) => response.json())
        .then((actualData) => {
          setLoading(false);
          setResult(actualData);
        })
        .catch((e) => {
          message.error(e.message);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    fetchData();
  }, [inputRef, divRef]);

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      divRef.current.submit();
    }
  };

  const onFinish = (values) => {
    checkValues(values);
  };

  const options = data?.map((item) => ({
    value: item,
    label: item,
  }));

  const AUDComp = () => {
    return (
      <div className={styles.audComp}>
        <div style={{ marginTop: 8 }}>
          <h4>UAD</h4>
        </div>
      </div>
    );
  };

  return (
    <Spin spinning={loading}>
      <div className={styles.container}>
        <Head>
          <title>Currency Convertor</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{ height: 268, width: "100%" }}>
          <img
            src="/image.png"
            alt="A beautiful background"
            width="100%"
            height="268"
            style={{ objectFit: "fill" }}
          ></img>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/background_image.png"
              alt="A beautiful background"
              width="100%"
              height="100%"
              style={{ objectFit: "fill" }}
            ></img>
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Form
              ref={divRef}
              onKeyUp={handleKeyUp}
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Card
                style={{
                  width: 380,
                  marginTop: 100,
                  height: 330,
                  borderRadius: 20,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="center-div-style">
                  <Typography.Text data-testid="heading">
                    {" "}
                    Foriegn Currency Exchange
                  </Typography.Text>
                </div>
                <div style={{ marginTop: 30, marginBottom: 30 }}>
                  <Form.Item
                    name="from"
                    label="From AU$"
                    rules={[{ required: true }]}
                  >
                    <Input
                      ref={inputRef}
                      autoFocus
                      size="large"
                      type="number"
                      placeholder="0.00"
                      style={{ borderRadius: "6px" }}
                      prefix={
                        <img
                          src="/dollar.png"
                          alt="A beautiful background"
                          width="10"
                          height="20"
                        ></img>
                      }
                    />
                  </Form.Item>
                </div>
                <Row gutter={40}>
                  <Col span={12}>
                    <AUDComp />
                  </Col>
                  <Col span={12}>
                    <Form.Item name="to" rules={[{ required: true }]}>
                      <Select
                        showArrow
                        allowClear
                        style={{ width: "100%", borderRadius: 6 }}
                        options={options}
                        placeholder="Select Currency"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    id="button"
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", height: 38 }}
                  >
                    Convert Now
                  </Button>
                </Form.Item>
              </Card>
            </Form>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {result !== null ? (
              <div style={{ marginTop: 10 }}>
                <h2>Converted. </h2>
                <h3>{value} Austrilian Dollar = </h3>
                <h2>{result} US Dollars </h2>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Home;
