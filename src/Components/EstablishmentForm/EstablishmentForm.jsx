
import "./EstablishmentForm.css";
// Antd
import React, {useState, useCallback} from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from 'antd';
import Http from "../../Helpers/Http";
import { createEstablishment, selectedEstablishment } from "../../Redux/Actions/EstablishmentActions";
import { readAllEstablishments } from "../../Redux/Reducers/EstablishmentReducer";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const EstablishmentForm = ({ createEstablishment }) => {




    const [upImg, setUpImg] = useState();
    const [imgRef, setImgRef] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
    const [previewUrl, setPreviewUrl] = useState();
    const [imgSrc,setImgSrc] = useState(null);
    
  
    const onSelectFile = e => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg(reader.result));
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const onLoad = useCallback(img => {
      setImgRef(img);
    }, []);
  
    const makeClientCrop = async crop => {
      if (imgRef && crop.width && crop.height) {
        createCropPreview(imgRef, crop, 'newFile.jpeg');
      }
    };
  
    const createCropPreview = async (image, crop, fileName) => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
  
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
  
      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          setImgSrc(canvas.toDataURL('image/jpeg',1.0));
          blob.name = fileName;
          window.URL.revokeObjectURL(previewUrl);
          setPreviewUrl(window.URL.createObjectURL(blob));
        }, 'image/jpeg');
      });
    };
  
  
  
  
  
      const onFinish = async (values) => {
          console.log(values);
          values.establishment.imagen=imgSrc;
          const result = await Http.post(values,'/api/establishments/createEstablishment');
          if(result){
            values.establishment.imagen = null;
            values.establishment.id_personal = result.id_usuario;
            values.establishment.id_perfil = result.id_perfil;
            values.establishment.id_local = result.id_local;
            values.establishment.id = result.id_local.toString();
            values.establishment.mesas = [];
            values.establishment.cartas = [];
            console.log(values);
            console.log(values.establishment);
            createEstablishment(values.establishment);

          }   
      }
  
  
      const layout = {
  
          labelCol: {
            span: 3,
          },
          wrapperCol: {
            span: 20,
          },
        };
     
  

  return (
    <React.Fragment>

<Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name={['establishment', 'nombre']}
            label="Nombre"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['establishment', 'ubicacion']}
            label="Ubicación"
            rules={[
                {
                    required: true,
                  },
            ]}
           
          >
            <Input />
            </Form.Item>
          <Form.Item name={['establishment', 'imagen']} label="Imagen"
      rules={[
        {
            required: false,
          },
        ]}
      >
          <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={makeClientCrop}
      />


        {previewUrl && <img alt="Crop preview" src={previewUrl} />}
        {/*previewUrl && console.log(previewUrl)*/}
        </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Crear Local
            </Button>
          </Form.Item>


      

        </Form>


    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
    return {establishments: readAllEstablishments(state)};
  };
  
  export default connect(mapStateToProps, {selectedEstablishment, createEstablishment})(EstablishmentForm);
  
  