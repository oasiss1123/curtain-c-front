import { CopyrightOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer>
      <div
        className="sarabun"
        style={{ textAlign: "center", color: "#ADADAD" }}
      >
        <CopyrightOutlined /> 2022 Curtain-C Version 1.4.0 <br/>Powered by Type-C
        Studio
      </div>
    </footer>
  );
};

export default Footer;
