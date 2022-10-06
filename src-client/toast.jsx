import { toast } from 'react-toastify';

function successToast(text) {
  toast.dismiss();
  toast.success(
    text, {
      autoClose: 4000,
    },
  );
}

function infoToast(text) {
  toast.dismiss();
  toast.info(
    text, {
      autoClose: 4000,
    },
  );
}

function errorToast(msg) {
  toast.dismiss();
  toast.error(
    msg || 'Sorry, an unknown error occured. Please try again later.', {
      autoClose: 4000,
    }
  );
}

export { successToast, errorToast, infoToast };
