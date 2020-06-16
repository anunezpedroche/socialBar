import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import Http from "../../Helpers/Http";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Register = () => {
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [previewUrl, setPreviewUrl] = useState();
  const [imgSrc, setImgSrc] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    setImgRef(img);
  }, []);

  const makeClientCrop = async (crop) => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, "newFile.jpeg");
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

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
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        setImgSrc(canvas.toDataURL("image/jpeg", 1.0));
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  const onFinish = async (values) => {
    console.log(values);
    values.user.avatar = imgSrc;
    const result = await Http.post(values, "/api/users/createUser");
    console.log(result);
  };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <div className="userForm">
      <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item
        key="usuario"
          name={["user", "nickname"]}
          label="Nickname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        key="contraseña"
        
          name={["user", "password"]}
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
        key="nombre"
          name={["user", "nombre"]}
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
        key="apellidos"
          name={["user", "apellidos"]}
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
        key="avatar"
          name={["user", "avatar"]}
          label="Avatar"
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
            onChange={(c) => setCrop(c)}
            onComplete={makeClientCrop}
          />

          {previewUrl && <img alt="Crop preview" src={previewUrl} />}
           
        </Form.Item>

        <Form.Item key="boton"wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Crear y Continuar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default Register;
