import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MarkDownEditer = ({
  label,
  value,
  changeValue,
  name,
  invalidField,
  setInvalidField,
}) => {
  // Hàm xử lý sự kiện thay đổi nội dung
  const handleEditorChange = (e) => {
    // Lấy nội dung từ trình soạn thảo
    const content = e.target.getContent();
    // Gọi hàm changeValue để cập nhật state của cha
    changeValue(content);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="">{label}</span>
      <Editor
        apiKey="epmo14bra6h2gcvjbldsydqpx623wtb48hzyfsaoznks4rlh"
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={handleEditorChange} // Sử dụng hàm xử lý mới này để cập nhật state
        onFocus={() => {
          setInvalidField && setInvalidField([]);
        }}
      />
      {invalidField?.some((el) => el.name === name) && (
        <small className="text-main text-sm">
          {invalidField?.find((el) => el.name === name)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(MarkDownEditer);
