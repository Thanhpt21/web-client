import path from "./path";
import icons from "./icons";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineStorefront } from "react-icons/md";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoIosResize } from "react-icons/io";

const {
  BsShieldShaded,
  AiFillGift,
  RiTruckFill,
  BsReplyFill,
  FaTty,
  AiOutlineDashboard,
  MdGroups,
  MdProductionQuantityLimits,
  RiBillLine,
  BiCategory,
  PiNewspaperClippingLight,
  IoColorPaletteOutline,
  GrContact,
  IoSettingsOutline,
} = icons;

export const navigation = [
  {
    id: 1,
    type: "SINGLE",
    value: "Trang chủ",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    type: "PARENT",
    value: "Sản phẩm",
    path: `/${path.PRODUCTS}`,
    submenu: [
      {
        id: "669fc8b5db02ba4cd66b6cd7",
        value: "Tai nghe",
        path: `/tai-nghe`,
      },
      {
        id: "669a7aaea22cb6b2eaa130f6",
        value: "Airpord",
        path: `/airpord`,
      },
    ],
  },
  {
    id: 3,
    type: "SINGLE",
    value: "Tin tức",
    path: `/${path.BLOG}`,
  },
  {
    id: 4,
    type: "SINGLE",
    value: "Về chúng tôi",
    path: `/${path.ABOUT_US}`,
  },
  {
    id: 5,
    type: "SINGLE",
    value: "Liên hệ",
    path: `/${path.CONTACT}`,
  },
];

export const productExtraInfo = [
  {
    id: 1,
    title: "Đảm bảo",
    sub: "Đã kiểm tra chất lượng",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Miễn phí vận chuyển",
    sub: "Miễn phí cho tất cả các sản phẩm",
    icon: <RiTruckFill />,
  },
  {
    id: 3,
    title: "Thẻ quà tặng ",
    sub: "Thẻ quà tặng đặc biệt",
    icon: <AiFillGift />,
  },
  {
    id: 4,
    title: "Miễn phí đổi trả",
    sub: "Trong vòng 7 ngày",
    icon: <BsReplyFill />,
  },
  {
    id: 5,
    title: "Tư vấn",
    sub: "Trọn đời, 24/7/365",
    icon: <FaTty />,
  },
];

export const productInfo = [
  {
    id: 2,
    title: "Bảo hành",
    content: `
      <p>Chính sách bảo hành của chúng tôi được thiết kế nhằm mang lại sự an tâm tuyệt đối cho khách hàng khi mua sản phẩm.</p>
      <p>Bảo hành là một cam kết chất lượng từ phía chúng tôi để đảm bảo sản phẩm hoạt động tốt và bền lâu. Chính sách bảo hành 
      áp dụng cho tất cả các sản phẩm mà chúng tôi cung cấp, từ điện tử, gia dụng cho đến các sản phẩm công nghệ cao.</p>
      <p>Dưới đây là các điều khoản và quy trình bảo hành chi tiết:</p>
  
      <ul>
        <li><strong>Điều kiện bảo hành</strong>: Sản phẩm được bảo hành miễn phí nếu có lỗi kỹ thuật do nhà sản xuất trong thời gian bảo hành. 
        Bảo hành không áp dụng cho các trường hợp hư hỏng do lỗi người sử dụng, thiên tai, hoặc các tác động bên ngoài. Các sản phẩm bảo hành phải có tem bảo hành và hoá đơn mua hàng hợp lệ.</li>
    
        <li><strong>Thời gian bảo hành</strong>: Thời gian bảo hành tùy thuộc vào loại sản phẩm và nhà sản xuất. Thông thường, thời gian bảo hành 
        là từ 12 đến 24 tháng. Đối với một số sản phẩm đặc biệt, thời gian bảo hành có thể dài hơn hoặc được gia hạn thêm. Quá trình bảo hành sẽ bắt đầu kể từ ngày mua hàng hoặc ngày sản phẩm được kích hoạt.</li>
    
        <li><strong>Quy trình bảo hành</strong>: Khi phát hiện lỗi sản phẩm, khách hàng cần liên hệ với bộ phận chăm sóc khách hàng của chúng tôi 
        hoặc mang sản phẩm đến trung tâm bảo hành chính thức để được kiểm tra. Sau khi kiểm tra, chúng tôi sẽ quyết định xem sản phẩm có đủ điều kiện để được bảo hành hay không. Nếu đủ điều kiện, chúng tôi sẽ tiến hành sửa chữa hoặc thay thế linh kiện miễn phí. Nếu sản phẩm không thể sửa chữa, khách hàng sẽ nhận được một sản phẩm thay thế tương đương hoặc hoàn tiền tùy theo chính sách của nhà sản xuất.</li>
    
        <li><strong>Lợi ích bảo hành</strong>: Khách hàng có thể yên tâm sử dụng sản phẩm mà không phải lo lắng về các vấn đề kỹ thuật. Bảo hành giúp bảo vệ quyền lợi của người tiêu dùng và tạo niềm tin về chất lượng sản phẩm. Ngoài ra, chúng tôi cam kết hỗ trợ nhanh chóng và hiệu quả trong suốt quá trình bảo hành, đảm bảo sản phẩm của bạn được sử dụng lâu dài mà không gặp phải vấn đề gì về kỹ thuật.</li>
    
        <li><strong>Lưu ý</strong>: Các sản phẩm bị hư hỏng do tai nạn, sử dụng sai cách hoặc can thiệp bên ngoài sẽ không được bảo hành. Ngoài ra, chúng tôi cũng không bảo hành các lỗi phát sinh từ phần mềm, hoặc lỗi do các thiết bị bên ngoài tác động vào sản phẩm. Hãy lưu ý tuân thủ hướng dẫn sử dụng của sản phẩm để tránh việc mất quyền lợi bảo hành.</li>
      </ul>
    `,
  },

  {
    id: 3,
    title: "Vận chuyển",
    content: `
      <p>Chính sách vận chuyển của chúng tôi nhằm đảm bảo khách hàng nhận được sản phẩm một cách nhanh chóng và an toàn nhất. 
      Chúng tôi cam kết cung cấp dịch vụ giao hàng chất lượng cao, với nhiều lựa chọn phù hợp với nhu cầu và địa điểm của khách 
      hàng. Dưới đây là các thông tin chi tiết về vận chuyển:</p>
  
      <ul>
        <li><strong>Phạm vi giao hàng</strong>: Chúng tôi cung cấp dịch vụ giao hàng trên toàn quốc. Bất kể bạn ở đâu, chúng tôi sẽ đảm bảo 
        sản phẩm được giao đến tay bạn nhanh chóng và an toàn. Các đơn hàng được giao đến các tỉnh thành trên toàn quốc, bao 
        gồm cả các khu vực thành phố lớn và các vùng sâu, vùng xa.</li>
      
        <li><strong>Chi phí vận chuyển</strong>: Chi phí vận chuyển sẽ được tính toán dựa trên trọng lượng, kích thước của sản phẩm và 
        địa điểm giao hàng. Đối với các đơn hàng có giá trị từ một mức nhất định, chúng tôi sẽ miễn phí vận chuyển. Chi tiết 
        về mức miễn phí vận chuyển sẽ được thông báo trên trang web tại thời điểm thanh toán. Mức phí vận chuyển cho mỗi 
        đơn hàng sẽ được hiển thị rõ ràng khi khách hàng nhập thông tin địa chỉ giao hàng.</li>
      
        <li><strong>Thời gian giao hàng</strong>: Thời gian giao hàng sẽ thay đổi tùy vào địa điểm và phương thức giao hàng mà khách hàng chọn. 
        Đối với các khu vực thành phố lớn, thời gian giao hàng thường dao động từ 1 đến 3 ngày làm việc. Đối với các khu vực 
        tỉnh lẻ, thời gian giao hàng có thể từ 3 đến 5 ngày làm việc, tuỳ vào điều kiện vận chuyển và giao nhận.</li>
  
        <li><strong>Lựa chọn giao hàng</strong>: Chúng tôi cung cấp nhiều lựa chọn giao hàng khác nhau để khách hàng dễ dàng lựa chọn, bao 
        gồm giao hàng tiêu chuẩn, giao hàng nhanh và giao hàng hẹn giờ. Khách hàng có thể lựa chọn phương thức giao hàng 
        phù hợp nhất với nhu cầu của mình khi thanh toán đơn hàng.</li>
  
        <li><strong>Kiểm tra đơn hàng</strong>: Sau khi đặt hàng, khách hàng có thể kiểm tra trạng thái đơn hàng của mình qua hệ thống theo dõi 
        trực tuyến. Khi sản phẩm được giao đi, khách hàng sẽ nhận được mã theo dõi để có thể kiểm tra quá trình vận chuyển 
        và ngày giao hàng dự kiến. Nếu có bất kỳ sự cố nào về giao hàng, khách hàng có thể liên hệ với chúng tôi để được hỗ trợ.</li>
  
        <li><strong>Chính sách đổi trả sau khi giao hàng</strong>: Nếu sản phẩm bị lỗi hoặc không đúng như mô tả, khách hàng có thể yêu cầu 
        đổi trả trong vòng 7 ngày kể từ ngày nhận hàng. Quy trình đổi trả sẽ được thực hiện theo hướng dẫn trên website của chúng tôi.</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: "Thanh toán",
    content: `
      <p>Chính sách thanh toán của chúng tôi rất linh hoạt và dễ dàng, giúp khách hàng có thể chọn lựa phương thức thanh toán 
      phù hợp nhất. Chúng tôi cung cấp nhiều phương thức thanh toán để đảm bảo sự thuận tiện và an toàn khi mua sắm trên 
      trang của chúng tôi. Dưới đây là các thông tin chi tiết về chính sách thanh toán:</p>
  
      <ul>
        <li><strong>Các phương thức thanh toán</strong>:
          <ul>
      
            <li><strong>Chuyển khoản ngân hàng</strong>: Khách hàng có thể chọn phương thức chuyển khoản ngân hàng thông qua các ngân hàng 
            phổ biến như Vietcombank, BIDV, Sacombank, và Techcombank. Sau khi thực hiện chuyển khoản, khách hàng cần gửi 
            chứng từ thanh toán để xác nhận đơn hàng.</li>
            
            <li><strong>Thanh toán khi nhận hàng (COD)</strong>: Nếu bạn ở các khu vực mà chúng tôi hỗ trợ, bạn có thể chọn phương thức thanh 
            toán khi nhận hàng. Khi đó, bạn sẽ thanh toán trực tiếp cho nhân viên giao hàng khi sản phẩm được giao đến tận 
            nơi.</li>
          </ul>
        </li>
  
        <li><strong>Chính sách bảo mật thanh toán</strong>: Chúng tôi cam kết bảo mật thông tin thanh toán của khách hàng. Tất cả các giao dịch 
        đều được mã hóa và xử lý qua hệ thống thanh toán an toàn. Các thông tin như số thẻ tín dụng, số tài khoản ngân hàng, 
        và các thông tin thanh toán khác sẽ không bao giờ được chia sẻ với bên thứ ba.</li>
    
        <li><strong>Hướng dẫn thanh toán</strong>: Sau khi bạn chọn phương thức thanh toán và hoàn tất đơn hàng, bạn sẽ nhận được thông báo 
        xác nhận đơn hàng. Nếu bạn chọn thanh toán qua thẻ hoặc ví điện tử, hệ thống sẽ tự động xử lý thanh toán. Nếu bạn chọn 
        chuyển khoản ngân hàng hoặc COD, bạn cần thực hiện thanh toán theo hướng dẫn trong email xác nhận.</li>
    
        <li><strong>Hỗ trợ thanh toán</strong>: Nếu bạn gặp bất kỳ vấn đề nào trong quá trình thanh toán, vui lòng liên hệ với đội ngũ hỗ trợ 
      khách hàng của chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn về phương thức thanh toán.</li>
    </ul>
  `,
  },
];

export const arrColors = ["Đen", "Tím", "Vàng", "Xanh", "Đỏ"];

export const sortby = [
  {
    id: 1,
    value: "-sold",
    text: "Bán chạy nhất",
  },
  {
    id: 2,
    value: "-title",
    text: "Theo thứ tự A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Theo thứ tự Z-A",
  },
  {
    id: 4,
    value: "price",
    text: "Giá thấp đến cao",
  },
  {
    id: 5,
    value: "-price",
    text: "Giá cao đến thấp",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Mới đến cũ",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Cũ đến mới",
  },
];

export const votes = [
  {
    id: 1,
    text: "Rất tệ",
  },
  {
    id: 2,
    text: "Tệ",
  },
  {
    id: 3,
    text: "Thường",
  },
  {
    id: 4,
    text: "Tốt",
  },
  {
    id: 5,
    text: "Rất tốt",
  },
];

export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Trang chủ",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard />,
  },

  {
    id: 2,
    type: "SINGLE",
    text: "Tài khoản",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Sản phẩm",
    path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
    icon: <MdProductionQuantityLimits />,
  },
  {
    id: 5,
    type: "PARENT",
    text: "Danh mục",
    icon: <BiCategory />,
    submenu: [
      {
        text: "Sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGE_CATEGORY_PRODUCT}`,
      },
      {
        text: "Tin tức",
        path: `/${path.ADMIN}/${path.MANAGE_CATEGORY_BLOG}`,
      },
    ],
  },

  {
    id: 6,
    type: "SINGLE",
    text: "Tin tức",
    path: `/${path.ADMIN}/${path.MANAGE_BLOG}`,
    icon: <PiNewspaperClippingLight />,
  },
  {
    id: 7,
    type: "SINGLE",
    text: "Màu sắc",
    path: `/${path.ADMIN}/${path.MANAGE_COLOR}`,
    icon: <IoColorPaletteOutline />,
  },
  {
    id: 13,
    type: "SINGLE",
    text: "Kích thước",
    path: `/${path.ADMIN}/${path.MANAGE_SIZE}`,
    icon: <IoIosResize />,
  },
  {
    id: 8,
    type: "PARENT",
    text: "Marketing",
    icon: <RiCoupon2Line />,
    submenu: [
      {
        text: "Mã giảm giá",
        path: `/${path.ADMIN}/${path.MANAGE_COUPON}`,
      },
      {
        text: "Phí vận chuyển",
        path: `/${path.ADMIN}/${path.MANAGE_SHIP}`,
      },
    ],
  },
  {
    id: 9,
    type: "SINGLE",
    text: "Hộp thư",
    path: `/${path.ADMIN}/${path.MANAGE_ENQUIRY}`,
    icon: <GrContact />,
  },
  {
    id: 10,
    type: "SINGLE",
    text: "Thương hiệu",
    path: `/${path.ADMIN}/${path.MANAGE_BRAND}`,
    icon: <MdOutlineStorefront />,
  },
  {
    id: 11,
    type: "SINGLE",
    text: "Chi nhánh",
    path: `/${path.ADMIN}/${path.MANAGE_RETAIL}`,
    icon: <IoStorefrontSharp />,
  },
  {
    id: 12,
    type: "PARENT",
    text: "Cài đặt",
    icon: <IoSettingsOutline />,
    submenu: [
      {
        text: "Phân quyền",
        path: `/${path.ADMIN}/${path.MANAGE_PERMISSION}`,
      },
      {
        text: "Cấu hình",
        path: `/${path.ADMIN}/${path.CREATE_CONFIG}`,
      },
      {
        text: "Menu",
        path: `/${path.ADMIN}/${path.CREATE_MENU}`,
      },
    ],
  },
];

export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Thông tin cá nhân",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Giỏ hàng của tôi",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdGroups />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Lịch sử mua hàng",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Danh sách yêu thích",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <RiBillLine />,
  },
];

export const roles = [
  {
    code: 1,
    value: "Admin",
  },
  {
    code: 2,
    value: "User",
  },
];

export const block = [
  {
    code: 1,
    value: "Kích hoạt",
  },
  {
    code: 2,
    value: "Khóa",
  },
];

export const statusOrder = [
  {
    label: "Đã hủy",
    value: "Đã hủy",
    color: "error",
  },
  {
    label: "Thành công",
    value: "Thành công",
    color: "success",
  },
  {
    label: "Đang chờ duyệt",
    value: "Đang chờ duyệt",
    color: "warning",
  },
  {
    label: "Đang giao hàng",
    value: "Đang giao hàng",
    color: "processing",
  },
];

export const statusProduct = [
  {
    color: "1",
    value: "Còn hàng",
  },
  {
    color: "2",
    value: "Hết hàng",
  },
];

export const statusEnquiry = [
  {
    label: "Đã hủy",
    value: "Đã hủy",
    color: "error",
  },
  {
    label: "Đã liên lạc",
    value: "Đã liên lạc",
    color: "success",
  },
  {
    label: "Đang chờ",
    value: "Đang chờ",
    color: "processing",
  },
];

export const typeMenu = [
  {
    code: "SINGLE",
    value: "SINGLE",
  },
  {
    code: "PARENT",
    value: "PARENT",
  },
];
