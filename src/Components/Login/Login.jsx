import React, { useState } from "react";
import { Input, Button, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Login.css";
import { logIn, whoAmI } from "../../Helpers/auth-helpers";
import { connect } from "react-redux";
import { logUser } from "../../Redux/Actions/UserActions";
import Register from "../Register/Register";

import { Layout, Modal } from "antd";

const { Header, Content, Footer } = Layout;

const Login = ({ logUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSignIn = async () => {
    const data = await logIn({
      nickname: userName,
      password: password,
    });

    if (data.succes) {
      const data = await whoAmI();
      if (data.auth) {
        logUser(data.user);
      }
    } else {
      setErrorMsg(data.message);
    }
  };

  const enterPressed = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <Layout>
      <Header className="headerParent">
        <div className="logo">
          {" "}
          <img style={{ width: 45 }} src={require("../../img/beer.svg")} />{" "}
          &nbsp; Social Bar &nbsp;{" "}
          <img style={{ width: 45 }} src={require("../../img/beer.svg")} />
        </div>
        <div className="header">
          {errorMsg ? (
            <Alert
              className="errorMsg"
              description={errorMsg}
              type="error"
              showIcon
            />
          ) : null}
          <Input
            className="inputUser"
            size="small"
            placeholder="Introduce un usuario"
            prefix={<UserOutlined />}
            onChange={(e) => setUserName(e.target.value.trim())}
          />
          <Input.Password
            size="small"
            placeholder="Introuce una contraseña"
            className="inputPassword"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={enterPressed}
          />
          <Button size="small" onClick={handleSignIn} className="btnLogin">
            Entrar
          </Button>

          <Button
            size="small"
            onClick={() => {
              setShowRegisterForm(!showRegisterForm);
            }}
            className="btnRegister"
          >
            Regístrate
          </Button>
        </div>
        <Modal
          title="Registro"
          visible={showRegisterForm}
          okText="Enviar"
          destroyOnClose={true}
          onOk={() => {
            console.log("ok");
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowRegisterForm(!showRegisterForm);
          }}
          width={600}
        >
          <Register />
        </Modal>
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content className="contentLogin">
            <h2>Preámbulo</h2>

            <p>
              Esta aplicación está siendo desarrollada como proyecto final del
              Grado Superior de Desarrollo en Aplicaciones Web. Somos totalmente
              conscientes de que muchas cosas que están funcionando en la
              aplicación pueden no estar desarrolladas de la mejor manera o de
              la forma más eficiente. Es un ejercicio de aprendizaje donde
              convergen diversos tipos de tecnologías utilizadas durante dos
              años de formación. Agradecemos igualmente cualquier crítica
              constructiva realizada al proyecto puesto que el objetivo
              principal de esta aplicación web es el aprendizaje.
            </p>

            <h2>¿Qué somos?</h2>
            <p>
              Esta aplicación nace de la necesidad de una 'nueva normalidad'
              especialmente en el sector de la hostelería. Muchas son las
              aplicaciones que podemos ver en estos días que nos muestra una
              carta de un establecimiento a través de un código QR. En este
              aspecto puede parecer que no ofrecemos nada nuevo, pero,
              trabajamos para incrementar nuevas funciones que nos permitan
              realizar pedidos desde la propia aplicación sin necesidad de
              entablar contacto directo con un trabajador, protegiendo así tanto
              a cliente como a trabajador. Pero no queremos quedarnos en esa
              parte, ya que es algo frío para nosotros, la pérdida de ese
              contacto humano. Por ello planteamos una herramienta que ofrezca
              una gestión íntegra de tu establecimiento así como ofrecer datos
              estadísiticos de tus propios platos, horas más rentables de tu
              negocio, etc... No es nuestra idea aprovechar un factor temporal
              para hacer negocios. Por ello ofrecemos toda la parte de gestión
              de cartas, generación de QR, etc... de forma totalmente gratuita
              ni compromiso ninguno, no es el objeto de esta aplicación lucrarse
              de un acontecimiento indeseable.
            </p>
            <h2>Tecnologías utilizadas</h2>
            <p>
              Un breve repaso a las tecnologías más usadas. Para consultar una
              lista completa acudir al listado de dependencias del repositorio
              de GitHub.
            </p>
            <p>
              En el front-end podemos encontrar diversas tecnologías como las
              siguientes:
            </p>
            <ul>
              <li>ReactJS</li>
              <li>Redux</li>
              <li>Ant Design</li>
            </ul>
            <p>Como Middle-ware podemos encontrar:</p>
            <ul>
              <li>Socket.io</li>
              <li>Passport</li>
            </ul>
            <p>Y en el back-end:</p>
            <ul>
              <li>NodeJS</li>
              <li>Express</li>
              <li>MySQL</li>
            </ul>
            <p>
              Entre otras muchas librerías que utilizamos para construir una API
              REST que nos proporcione los datos que necesitamos en nuestra
              aplicación.
            </p>
          </Content>
        </Layout>
        <Footer className="footer">
          Powered by Adrián Núñez Pedroche para IES La Sènia
        </Footer>
      </Layout>
    </Layout>
  );
};

export default connect(null, { logUser })(Login);
