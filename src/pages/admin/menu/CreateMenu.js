import React, { useEffect, useState } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import icons from "utils/icons";
import { apigetMenus, apiCreateMenu, apiDeleteMenu, apiUpdateMenu } from "apis";
import slugify from "slugify";
import { showModal } from "store/app/appSlice";

const { BiEdit, AiFillDelete } = icons;

const CreateMenu = () => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [menuType, setMenuType] = useState("SINGLE");
  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null); // State to manage the menu being edited
  const [showParentMenuWarning, setShowParentMenuWarning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchMenus = async () => {
    try {
      const response = await apigetMenus(); // URL API để lấy danh sách menu
      setMenus(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách menu:", error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    reset({});
    if (editingMenu) {
      setValue("value", editingMenu.value);
      setValue("path", editingMenu.path);
      setValue("orderly", editingMenu.orderly || ""); // Set orderly value
      setMenuType(editingMenu.type);

      setSelectedMenus(editingMenu.parent || []);
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editingMenu, reset, setValue]);

  const convertToSlug = (text) => {
    return slugify(text, {
      lower: true, // Chuyển đổi tất cả các ký tự thành chữ thường
      strict: true, // Loại bỏ các ký tự không hợp lệ
      locale: "vi", // Đảm bảo hỗ trợ tiếng Việt
    });
  };

  const handleUpdateMenu = async (data) => {
    let path = convertToSlug(data.value);
    path = "/" + path;

    const finalPayload = {
      ...data,
      path,
      parent: selectedMenus,
      type: menuType,
    };

    // Kiểm tra nếu loại menu là "PARENT" và không có menu cha nào được chọn
    if (menuType === "PARENT" && selectedMenus.length === 0) {
      setShowParentMenuWarning(true);
      toast.warning("Vui lòng chọn menu cha");
      return;
    } else {
      setShowParentMenuWarning(false);
    }

    try {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));

      let response;
      if (editingMenu) {
        // Nếu đang chỉnh sửa menu đã tồn tại (có editingMenu)
        response = await apiUpdateMenu(finalPayload, editingMenu?._id);
      } else {
        // Nếu không có editingMenu tức là tạo menu mới
        response = await apiCreateMenu(finalPayload);
      }

      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      if (response.success) {
        toast.success(response.message);
        setEditingMenu(null); // Clear editing menu
        fetchMenus();
        reset(); // Đặt lại form sau khi thành công
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Lỗi khi tạo hoặc cập nhật menu:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleTypeChange = (e) => {
    setMenuType(e.target.value);
  };

  const handleCheckboxChange = (menuId) => {
    setSelectedMenus((prevSelected) =>
      prevSelected.includes(menuId)
        ? prevSelected.filter((id) => id !== menuId)
        : [...prevSelected, menuId]
    );
  };

  const handleEdit = (menu) => {
    if (menu.type === "SINGLE") {
      // Nếu menu là menu cha (type === 'SINGLE')
      setEditingMenu(menu);
      setValue("value", menu.value);
      setValue("path", menu.path);
      setValue("orderly", menu.orderly || 1); // Set orderly value
      setMenuType("SINGLE"); // Đặt lại loại menu thành "SINGLE"
      setSelectedMenus([]); // Đặt danh sách menu cha rỗng vì menu cha không có parent
    } else if (menu.type === "PARENT") {
      // Nếu menu là menu con (type === 'PARENT')
      setEditingMenu(menu);
      setValue("value", menu.value);
      setValue("path", menu.path);
      setValue("orderly", menu.orderly || 1); // Set orderly value
      setMenuType("PARENT"); // Đặt lại loại menu thành "PARENT"
      setSelectedMenus(menu.parent || []); // Đặt danh sách menu cha đã chọn
    } else {
      // Trường hợp còn lại, xử lý bình thường
      setEditingMenu(menu);
      setValue("value", menu.value);
      setValue("path", menu.path);
      setValue("orderly", menu.orderly || 1); // Set orderly value
      setMenuType(menu.type); // Đặt loại menu như ban đầu
      setSelectedMenus(menu.parent || []);
    }
  };
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa menu này?"
      );
      if (!confirmDelete) return;

      const response = await apiDeleteMenu(id);
      if (response.success) {
        toast.success("Xóa menu thành công");
        fetchMenus(); // Cập nhật lại danh sách menu sau khi xóa thành công
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa menu:", error);
      toast.error("Có lỗi xảy ra khi xóa menu");
    }
  };

  const filteredMenus = menus?.filter((menu) => menu.type === "SINGLE");

  const handleCancle = () => {
    reset();
    setEditingMenu(null);
    setIsEditing(false);
    setMenuType("SINGLE");
    setSelectedMenus([]);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>{isEditing ? "Cập nhật menu" : "Tạo mới menu"}</span>
      </h1>
      <div className="p-4 flex gap-2">
        <div className="w-[70%]">
          <form onSubmit={handleSubmit(handleUpdateMenu)}>
            <div className="w-full my-6 flex gap-4">
              <InputForm
                label={"Tên menu"}
                register={register}
                errors={errors}
                id="value"
                validate={{
                  required: "Vui lòng nhập tên menu",
                }}
                fullwidth
                placeholder
                style="flex-auto"
              />
              <InputForm
                label={"Thứ tự"}
                register={register}
                errors={errors}
                id="orderly"
                validate={{
                  required: "Vui lòng nhập thứ tự",
                }}
                fullwidth
                placeholder
                style="flex-auto"
                type="number"
              />
            </div>
            <div className="w-full my-6 flex gap-4">
              <div className="flex flex-col gap-4">
                <label>Loại menu:</label>
                <select
                  value={menuType}
                  onChange={handleTypeChange}
                  name="menuType"
                >
                  <option value="PARENT">Menu con</option>
                  <option value="SINGLE">Menu cha</option>
                </select>

                {menuType === "PARENT" && (
                  <div>
                    <h3>Chọn menu cha:</h3>
                    {menus
                      .filter((menu) => menu.type === "SINGLE")
                      .map((menu) => (
                        <div className="flex gap-2 items-center" key={menu._id}>
                          <input
                            type="checkbox"
                            id={`menu-${menu._id}`}
                            checked={selectedMenus.includes(menu._id)}
                            onChange={() => handleCheckboxChange(menu._id)}
                          />
                          <label htmlFor={`menu-${menu._id}`}>
                            {menu.value}
                          </label>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 flex gap-2">
              <ButtonField type="submit">
                {isEditing ? "Cập nhật" : "Tạo mới"}
              </ButtonField>
              {isEditing && (
                <ButtonField type="button" handleOnClick={handleCancle}>
                  Hủy
                </ButtonField>
              )}
            </div>
          </form>
        </div>

        <div className="w-[30%]">
          <div className="flex flex-col gap-2 p-4">
            {/* Render các menu cha có type là "SINGLE" và submenu */}
            {filteredMenus
              ?.sort((a, b) => (a.orderly > b.orderly ? 1 : -1)) // Sắp xếp menu cha theo orderly từ nhỏ đến lớn
              .map((el) => (
                <div key={el._id}>
                  <div className="flex justify-between">
                    <span>{el.value}</span>
                    <span className="flex gap-2">
                      <span>
                        <BiEdit onClick={() => handleEdit(el)} />
                      </span>
                      <span>
                        <AiFillDelete onClick={() => handleDelete(el._id)} />
                      </span>
                    </span>
                  </div>
                  {/* Hiển thị submenu của menu cha */}
                  <div className="flex flex-col gap-2 mt-2 pl-4">
                    {el.submenu
                      .sort((a, b) => (a.orderly > b.orderly ? 1 : -1)) // Sắp xếp submenu theo orderly từ nhỏ đến lớn
                      .map((sub) => (
                        <div
                          key={sub._id}
                          className="flex justify-between pl-4"
                        >
                          <span>{sub.value}</span>
                          <span className="flex gap-2">
                            <span>
                              <BiEdit onClick={() => handleEdit(sub)} />
                            </span>
                            <span>
                              <AiFillDelete
                                onClick={() => handleDelete(sub._id)}
                              />
                            </span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
