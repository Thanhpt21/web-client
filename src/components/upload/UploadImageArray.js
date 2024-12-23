import React, { useState, useEffect } from "react";
import { Upload, Spin, message, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { apiUploadImages } from "apis/upload"; // Đảm bảo rằng API này được thực hiện đúng

const UploadImageArray = ({ imageUrls, onImagesUpload, required }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [allImageUrls, setAllImageUrls] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [tempImageUrls, setTempImageUrls] = useState([]);

  useEffect(() => {
    // Đảm bảo imageUrls là một mảng đơn giản của các chuỗi URL
    setAllImageUrls(Array.isArray(imageUrls) ? imageUrls.flat() : []);
  }, [imageUrls]);

  const handleUploadImage = async (files) => {
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await apiUploadImages(formData);

      if (response.data && Array.isArray(response.data)) {
        const newUrls = response.data.flat(); // Giả sử API trả về mảng các mảng URL, chúng ta gộp lại thành mảng đơn giản
        setAllImageUrls([...newUrls]);
        onImagesUpload([...newUrls]);
        setFileList([]); // Xóa danh sách file sau khi upload thành công
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      message.error("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemoveImage = (urlToRemove) => {
    setIsUpdating(true);
    // Tạo dữ liệu mới sau khi xóa
    const updatedUrls = allImageUrls.filter((url) => url !== urlToRemove);
    setTempImageUrls(updatedUrls);
    setIsUpdating(false);
  };

  console.log("allImageUrls", allImageUrls);

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Upload
          customRequest={({ file, onSuccess, onError }) => {
            handleUploadImage([file])
              .then(() => onSuccess())
              .catch((error) => onError(error));
          }}
          fileList={fileList}
          onChange={handleChange}
          showUploadList={false}
          listType="picture-card"
          accept="image/*"
          multiple
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
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {isUpdating ? (
          <Spin />
        ) : tempImageUrls && tempImageUrls.length > 0 ? (
          tempImageUrls.map((url, index) => (
            <div
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <Image
                src={url}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                alt={`upload-preview-${index}`}
              />
              <div
                onClick={() => handleRemoveImage(url)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                  padding: "5px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <DeleteOutlined style={{ color: "red" }} />
              </div>
            </div>
          ))
        ) : (
          allImageUrls &&
          allImageUrls.length > 0 &&
          allImageUrls.map((url, index) => (
            <div
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <Image
                src={url}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                alt={`upload-preview-${index}`}
              />
              <div
                onClick={() => handleRemoveImage(url)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                  padding: "5px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <DeleteOutlined style={{ color: "red" }} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UploadImageArray;
