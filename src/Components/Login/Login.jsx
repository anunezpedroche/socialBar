import React, { useState } from "react";
import { Input, Button, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Login.css";
import { logIn, whoAmI } from '../../Helpers/auth-helpers';
import { connect } from 'react-redux';
import { logUser } from '../../Redux/Actions/UserActions';
import Register from '../Register/Register';

import { Layout, Modal} from 'antd';

const { Header, Content } = Layout;


const Login = ({logUser}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleSignIn = async () => {
        const data = await logIn({
            nickname: userName, 
            password: password
        });

        if (data.succes) {
            const data = await whoAmI();
            if (data.auth) {
                logUser(data.user);
            }
        }
        else {
            setErrorMsg(data.message);
        }
        
    };

    const enterPressed = (event) => {
        if(event.key === "Enter"){
            handleSignIn();
        }
    }

    return (


<Layout>
    <Header className="headerParent">
    <div className="logo">      <img style={{width:45}} src={require("../../img/beer.svg")}/> &nbsp;<p> Social Bar  </p> &nbsp; <img style={{width:45}} src={require("../../img/beer.svg")}/></div>
    <div className="header">


      {
            (errorMsg)?
             <Alert
                className="errorMsg"
                description={errorMsg}
                type="error"
                showIcon
            />:null
            }
            <Input
                className="inputUser"
                size="small"
                placeholder="Introduce un usuario"
                prefix={<UserOutlined />}
                onChange={e => setUserName(e.target.value.trim())}
            />
            <Input.Password
                size="small"
                placeholder="Introuce una contraseña"
                className="inputPassword"
                onChange={e => setPassword(e.target.value)}
                onKeyPress={enterPressed}
            />
            <Button size="small"onClick={handleSignIn} className="btnLogin">
                Entrar
            </Button>
            
            <Button size="small" onClick={()=>{setShowRegisterForm(!showRegisterForm)}} className="btnRegister">
                Regístrate
            </Button>

            </div>
            <Modal
          title="Registro"
          visible={showRegisterForm}
          okText="Enviar"
          destroyOnClose={true}
          onOk={() => {
            console.log("ok")
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowRegisterForm(!showRegisterForm);
          }}
          width={600}
        >
            
            <Register/>
        </Modal>

    </Header>
    <Layout>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content className="contentLogin">


<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet pulvinar nibh et tincidunt. Suspendisse urna neque, laoreet ultricies varius sit amet, blandit vitae erat. Vestibulum malesuada velit vel posuere volutpat. Praesent lobortis, neque in condimentum luctus, sem felis rutrum neque, at pretium est nibh non velit. Aliquam lacus eros, viverra in lorem elementum, molestie sollicitudin dui. In finibus, odio vel gravida dignissim, elit turpis rutrum sapien, gravida dapibus mauris mauris a sapien. Nulla sed condimentum lacus, vel tempor quam. Donec non semper neque. Nam eget condimentum orci, vehicula porttitor est.

Nullam condimentum, neque in dapibus tincidunt, metus ex suscipit nibh, eget viverra libero enim vel justo. Vestibulum et venenatis mauris, et tempus nisl. Ut ligula nulla, luctus ut sodales ac, imperdiet hendrerit metus. Donec nec convallis leo, eu pretium quam. Suspendisse feugiat porta tortor quis malesuada. Cras nec sem efficitur, dictum eros id, interdum quam. Praesent sed varius dui, ut egestas elit. Curabitur porta elit eget libero bibendum porta. Aenean lacus nisi, euismod eget malesuada et, dignissim vel nisi. In vel urna quis risus porta tempus. Quisque eget mattis risus. In dignissim vel sapien sed viverra. Integer convallis laoreet ligula, sit amet auctor nulla laoreet ac.

Integer ac felis sapien. </p>

<p>
Aenean nec erat a metus interdum molestie at ut risus. In placerat eleifend mi et porttitor. Fusce cursus mattis velit quis pulvinar. Praesent aliquam sapien eget libero iaculis, eget molestie ante efficitur. Aliquam egestas bibendum libero et maximus. Aenean a nulla at nulla efficitur tincidunt ultrices sed quam. Vivamus et nulla elit. Quisque quis dui semper, placerat ipsum id, pellentesque diam. Phasellus in efficitur nibh. Proin augue lacus, sollicitudin ac leo placerat, interdum lobortis nibh. Aliquam in eleifend ex.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse tempor tortor ac sapien ornare vestibulum. Pellentesque iaculis sollicitudin magna at iaculis. Aliquam accumsan in neque sed vehicula. Vivamus faucibus dolor sit amet ligula finibus, et sodales libero euismod. Cras vitae vulputate diam. Praesent maximus eros sit amet metus convallis tempor. Nullam ornare condimentum dolor sit amet tempus. Vivamus diam tortor, sodales eu tortor id, pulvinar iaculis erat. Phasellus consectetur, risus eget facilisis blandit, tortor purus accumsan ante, ut lacinia lectus enim in nisi. Ut porta, tellus luctus gravida rutrum, sem est molestie erat, et sodales massa nisi vel nisl. Quisque dui tortor, viverra cursus sodales eu, aliquam at nisl. Aliquam aliquam nisl vehicula nulla consequat cursus. Sed felis enim, fermentum quis maximus nec, efficitur in odio.

Nam ullamcorper urna eu dui pulvinar, sit amet fermentum nibh rhoncus. Etiam ullamcorper, tortor vel posuere tincidunt, velit felis tincidunt nunc, in vestibulum eros dui at mauris. Fusce pulvinar commodo velit, nec cursus nisi consequat id. Donec suscipit efficitur auctor. Vestibulum a enim ac lorem aliquam feugiat. Morbi ac fringilla mauris. Mauris aliquam aliquam ultrices. Nam et urna eu quam interdum euismod. Nullam congue accumsan augue in porta. Donec risus urna, porttitor ut lacus vitae, lacinia commodo mi. Etiam at elit tempor, mattis magna et, ullamcorper odio. Nullam pharetra lacus sapien, vel tristique elit placerat a. Curabitur consectetur orci leo, vitae vulputate dolor consectetur in.

Donec purus lacus, fermentum at nibh a, pretium efficitur augue. Mauris odio augue, convallis non quam et, semper faucibus diam. Etiam ac libero iaculis, lacinia nulla eu, tincidunt turpis. Integer mattis nisi ut nunc fermentum euismod. Suspendisse hendrerit erat vel purus consequat vulputate. Curabitur viverra lacus turpis, a ultricies nisi eleifend ac. Nunc lacinia nisi in velit condimentum lobortis. Aenean consectetur, metus a lacinia suscipit, augue purus molestie purus, vitae blandit leo dolor ac urna. Nunc rutrum arcu vel tincidunt suscipit. Nulla elementum mi quis nulla posuere, sed efficitur lectus molestie.

Phasellus ut sem ornare, rutrum purus sed, interdum dolor. Morbi tristique pretium volutpat. Proin ex eros, luctus at porta vel, facilisis quis risus. Maecenas at ligula feugiat, volutpat dolor pretium, laoreet felis. Mauris facilisis odio gravida nibh elementum ullamcorper. Vestibulum elementum vitae est a maximus. Nulla vel risus mi. Nunc blandit libero in nisl semper blandit. Maecenas ut metus maximus, laoreet ex eu, consequat urna. Cras cursus condimentum libero sed ullamcorper. Sed id fringilla libero. Maecenas nibh lectus, eleifend quis vehicula vitae, ultricies nec nibh. In iaculis dui quis mattis vestibulum.

Aliquam egestas bibendum sem eget sagittis. Etiam ultricies consequat mi. Maecenas nunc felis, ultrices nec purus eget, vestibulum tincidunt lorem. In dictum elit facilisis nunc mattis lacinia. In porttitor commodo massa non lacinia. Cras vel tristique purus. Quisque quis nunc in mauris pellentesque finibus. Aenean sagittis mi vehicula, fringilla urna at, finibus metus. Vestibulum ipsum ipsum, pulvinar nec hendrerit malesuada, viverra non mi. Donec laoreet, nisi lacinia consectetur dapibus, dolor erat ultricies mi, a sollicitudin magna libero ac sem. Vivamus finibus nibh dui, sed porta nulla euismod sed. Donec et enim luctus, dignissim elit non, rutrum dolor. Suspendisse sit amet tincidunt turpis. Integer pharetra turpis ut hendrerit sollicitudin.

Integer eu lorem lacinia, rutrum eros sit amet, ultrices nulla. Vestibulum maximus posuere ornare. </p>

<p>Nulla in ornare ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ac enim eget odio vulputate tempus eu quis est. Etiam a risus elit. Sed imperdiet arcu nec dolor auctor, ut posuere erat cursus. Cras dictum nisi sit amet tellus molestie aliquet. Donec semper orci nec metus lacinia, nec suscipit nulla lacinia. Nam mattis, felis non imperdiet suscipit, nunc augue consectetur orci, at hendrerit risus lectus id quam.

Cras porttitor velit ac ex sagittis, vitae euismod metus ultrices. Proin posuere ipsum in luctus imperdiet. Quisque porttitor odio vel libero fringilla, eu malesuada justo tempor. Integer nec augue vel magna viverra ornare. Duis eu risus nec leo pulvinar sodales sed sit amet arcu. Suspendisse at dignissim sapien, quis elementum eros. Vestibulum nec mauris ut nunc ultricies congue et sed augue. Aenean id enim pharetra, sodales leo vel, ullamcorper dui. Nam tincidunt felis at ante feugiat, ut maximus ante tempor. Suspendisse potenti. Proin augue leo, tempus vel congue vitae, maximus at dui. Morbi commodo eu dolor sit amet maximus. Curabitur ut sollicitudin nisi, eu porta neque. Donec accumsan accumsan leo, id aliquam urna lacinia pellentesque. Vivamus at commodo mauris. Quisque sodales vitae augue vel vehicula.

Phasellus nec eros rhoncus, ullamcorper quam egestas, scelerisque leo. Etiam condimentum sagittis feugiat. Aenean eget neque et urna rutrum efficitur. Fusce sodales, urna at faucibus faucibus, velit velit luctus libero, sit amet maximus nisi justo vitae risus. Sed posuere mi eget tellus porttitor tristique. Etiam posuere dolor in blandit rutrum. Maecenas gravida blandit lacus, eu fringilla magna sagittis in. Nulla facilisi. Nullam viverra, libero a volutpat scelerisque, ex nibh aliquam leo, eget tempor augue augue vitae augue.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus iaculis faucibus vulputate. Sed imperdiet sapien nibh, sed cursus sapien venenatis hendrerit. Integer aliquet lacus a vestibulum convallis. Nunc hendrerit in nulla non tempus. Vivamus iaculis dignissim purus, ut viverra leo pretium congue. Donec sed aliquam justo.

Sed porta vulputate magna non luctus. Aenean nec gravida neque. Aenean at mollis lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at erat molestie, eleifend magna id, malesuada odio. Nam sagittis a eros eleifend mollis. Fusce volutpat iaculis interdum. Praesent dictum, ex vitae feugiat ullamcorper, elit tellus commodo risus, eu gravida leo velit et turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla nec egestas ligula, quis ullamcorper dui.

Nam vel accumsan ipsum. Sed pulvinar euismod lacinia. Suspendisse volutpat lobortis facilisis. Aliquam pretium eleifend posuere. Cras non dolor non libero condimentum congue vitae et sem. Mauris nisl purus, fermentum a risus sit amet, gravida maximus quam. Maecenas cursus volutpat luctus. Etiam massa ipsum, fringilla et sem sed, faucibus vehicula velit. Vestibulum vel est aliquam massa pellentesque vehicula. Ut quam tellus, cursus non vulputate in, elementum in sem. Nullam condimentum leo non ipsum imperdiet, eu interdum metus pellentesque. Sed mollis, velit et placerat placerat, odio ex maximus purus, et commodo orci arcu quis purus. Praesent pharetra massa eu tellus dictum, ac porta eros rhoncus. Mauris quis nibh suscipit, congue nulla vel, tincidunt nisi. Maecenas vitae iaculis ipsum. Cras vel enim arcu.

Nunc placerat iaculis lorem sed sagittis. Integer quam erat, finibus eget aliquam vitae, aliquam sed dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce odio sem, lobortis ac eleifend quis, euismod quis elit. Aliquam ac turpis quis metus porta efficitur at quis ligula. Vivamus ultricies accumsan dignissim. Quisque ultrices, est ut imperdiet consectetur, neque tellus pellentesque velit, id vestibulum neque odio in magna. Morbi facilisis sit amet neque eget scelerisque. Sed ac nisl ac lectus dictum semper. Phasellus a pellentesque nisi. Ut rutrum, sapien vitae vehicula mattis, arcu massa tincidunt nulla, ac interdum leo urna nec sapien. Aenean at rhoncus augue. Ut ullamcorper iaculis purus. Curabitur dictum commodo auctor. Sed faucibus, nisi vel euismod venenatis, velit nibh convallis lectus, ut mattis sem justo id justo. Pellentesque fermentum, metus sed tincidunt mattis, tortor risus viverra urna, quis malesuada erat justo in est.

Donec eu magna malesuada, euismod lorem id, aliquet magna. Sed ut sollicitudin arcu. Duis iaculis in ex sit amet consequat. Etiam aliquam ornare urna et scelerisque. Aenean vel luctus erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. In fermentum quis augue in scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus eleifend enim eget metus lobortis molestie.

Sed nec congue sem. Aenean in sapien vitae justo fermentum tempus in at eros. Praesent iaculis maximus dui ac finibus. Cras in purus porttitor, facilisis est feugiat, egestas metus. Sed posuere accumsan maximus. Curabitur a velit ac purus pellentesque congue quis sit amet risus. Quisque posuere porttitor ex, nec tristique enim lobortis a. Pellentesque est neque, varius non purus eu, auctor elementum nunc. Etiam libero quam, sagittis placerat euismod ut, mattis pretium ligula. Mauris bibendum augue at purus dapibus, eu accumsan erat efficitur. Mauris pellentesque et libero sit amet dapibus. Mauris feugiat metus quam.

Etiam vehicula finibus quam scelerisque molestie. Aliquam venenatis eros ipsum, non interdum diam pellentesque at. Nulla nec eros fermentum, pellentesque elit eu, porta orci. Sed non erat nec eros dapibus laoreet a at justo. Ut sed felis ultricies, egestas ipsum ac, ultrices turpis. Proin volutpat nulla ac consequat hendrerit. Vestibulum efficitur elit quis eleifend lacinia. Quisque posuere malesuada pellentesque. Sed ullamcorper ante eget orci pulvinar ullamcorper. Aliquam a quam sed felis volutpat mollis. Nulla in vehicula est. Pellentesque et lacinia mi. Morbi lobortis bibendum turpis, ac pellentesque lorem pretium eu. Nullam posuere dolor eu consectetur vulputate. Nam semper volutpat erat eget auctor. Donec lacinia consectetur diam, at pellentesque orci laoreet eget.

Pellentesque bibendum maximus orci. Phasellus massa ligula, ultrices eget ante ac, commodo suscipit risus. Cras a dui sed est varius luctus et nec sem. Donec malesuada ex auctor metus aliquet fermentum. Aenean efficitur nec ligula sed lobortis. Duis lobortis id leo vitae iaculis. Nullam convallis metus odio, congue euismod urna tempus a. Cras rhoncus sapien ac ante semper elementum. Duis eleifend nulla quis nibh commodo fringilla. Mauris molestie vulputate neque, a pharetra arcu dapibus a. Etiam placerat lectus et nisi vehicula, ut pellentesque orci luctus. Sed consectetur, diam tempor sagittis rutrum, nibh elit aliquet sapien, eu fringilla lectus dui vel urna. Nullam quam dui, fringilla vitae pretium at, commodo a dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut mauris id odio faucibus rhoncus. Ut et mollis erat.

Praesent at ornare sem. Donec in nunc quis nisl dictum fermentum. Vivamus eu egestas ipsum, eget interdum mauris. Vestibulum nibh sem, venenatis ut tincidunt eget, eleifend id nulla. Phasellus justo sem, ornare egestas convallis id, consequat sed justo. Curabitur lobortis mauris ac purus sodales egestas. Praesent varius, dui eu viverra semper, nisi tellus pulvinar nunc, sed finibus elit mauris sit amet nulla. Duis nec dignissim quam, quis viverra tellus. Donec convallis massa et fermentum dictum. Cras finibus enim non diam pharetra ullamcorper. Suspendisse fermentum rhoncus orci, non feugiat massa dapibus vitae. 
</p>

        </Content>
      </Layout>
    </Layout>
  </Layout>



    );
};

export default connect(null,{logUser})(Login);