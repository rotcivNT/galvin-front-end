import * as yup from 'yup';
const schema = yup.object({
  fullName: yup
    .string()
    .required('Họ và tên không được để trống')
    .matches(/^[\p{L}\s]+$/u, 'Vui lòng nhập họ và tên hợp lệ'),
  phone: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(
      /^(0|\+84)(3[2-9]|5[2689]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/,
      'Số điện thoại không hợp lệ',
    ),
  email: yup
    .string()
    .required('Email không được để trống')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ'),
  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(8, 'Mật khẩu phải có tối thiểu 8 kí tự'),
  passwordConfirm: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không chính xác'),
});

export { schema };
