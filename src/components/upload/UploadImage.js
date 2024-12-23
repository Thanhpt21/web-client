import React, { useState } from "react";
import { Upload, Spin, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiUploadImage } from "apis/upload";

const UploadImage = ({ imageUrl, onImageUpload, required }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUploadImage = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiUploadImage(formData);

      if (response.secure_url) {
        onImageUpload(response.secure_url);
        setFileList([]);
      } else {
        throw new Error("Cấu trúc phản hồi không hợp lệ");
      }
    } catch (error) {
      message.error("Lỗi khi tải ảnh: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Custom validator function for form validation
  const uploadValidator = (_, value) => {
    if (required && !fileList.length && !imageUrl) {
      return Promise.reject(new Error("Vui lòng tải lên hình ảnh!"));
    }
    return Promise.resolve();
  };

  return (
    <Form.Item
      name="image"
      rules={[{ validator: uploadValidator }]}
      style={{ margin: 0 }} // Remove extra margin for better alignment
    >
      <Upload
        customRequest={({ file, onSuccess, onError }) => {
          handleUploadImage(file)
            .then(() => onSuccess())
            .catch((error) => onError(error));
        }}
        fileList={fileList}
        onChange={handleChange}
        showUploadList={false}
        listType="picture-card"
        accept="image/*"
      >
        {uploading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        ) : fileList.length > 0 || imageUrl ? (
          <img
            src={fileList[0]?.url || imageUrl}
            style={{ width: "100%" }}
            alt="upload-preview"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UploadOutlined style={{ fontSize: "24px" }} />
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

export default UploadImage;
