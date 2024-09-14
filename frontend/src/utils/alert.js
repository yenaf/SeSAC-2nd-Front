// alert.js
import Swal from 'sweetalert2';
import '../styles/pages/Login.scss';

export const simpleAlert = async (icon, title, position = 'center') => {
  await Swal.fire({
    position,
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      container: 'my-swal-container', // 사용자 정의 클래스 사용
    },
  });
};

export const showAlert = async (icon, title, position = 'center', text) => {
  const result = await Swal.fire({
    icon,
    title,
    position,
    text,
    confirmButtonText: '확인',
    confirmButtonColor: '#d678ab',
    customClass: {
      container: 'my-swal-container', // 사용자 정의 클래스 사용
    },
  });
  return result.isConfirmed;
};

export const confirmAlert = async (icon, title) => {
  const result = await Swal.fire({
    icon,
    title,
    showCancelButton: true,
    confirmButtonColor: '#d678ab',
    cancelButtonColor: '#777',
    confirmButtonText: '예',
    cancelButtonText: '아니요',
  });
  return result.isConfirmed;
};

// icon : success, error, warning, info, question
