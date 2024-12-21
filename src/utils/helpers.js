import slugify from "slugify";
import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const convertToSlug = (text) => {
  return slugify(text, {
    lower: true, // Chuyển đổi tất cả các ký tự thành chữ thường
    strict: true, // Loại bỏ các ký tự không hợp lệ
    locale: "vi", // Đảm bảo hỗ trợ tiếng Việt
  });
};
export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  number = Math.round(number);
  for (let i = 0; i < +Math.round(number); i++)
    stars.push(<AiFillStar color="orange" size={size || 16} />);
  for (let i = 5; i > +Math.round(number); i--)
    stars.push(<AiOutlineStar color="orange" size={size || 16} />);
  return stars;
};

export function secondsToHms(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}

export const validate = (payload, setInvalidField) => {
  let invalid = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalid++;
      setInvalidField((prev) => [
        ...prev,
        { name: arr[0], message: `Vui lòng nhập thông tin` },
      ]);
    }
  }
  return invalid;
};

export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export function getBase64(file) {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const truncateText = (text, maxWords) => {
  // Tách chuỗi thành các từ
  const words = text.split(" ");

  // Nếu số từ ít hơn hoặc bằng maxWords, trả về chuỗi ban đầu
  if (words.length <= maxWords) {
    return text;
  }

  // Nếu số từ lớn hơn maxWords, lấy maxWords từ đầu và nối với dấu ba chấm
  return words.slice(0, maxWords).join(" ") + "...";
};
