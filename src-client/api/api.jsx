import axios from 'axios';
import { errorToast, infoToast } from '../toast';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use((c) => {
  c.headers.Authorization = `${localStorage.getItem('token')}`;
  return c;
});

const api = {
  auth: {
    me: () => instance.get('api/users/me'),
    login: (data) => instance.post('users/sign_in', data),
    logout: () => instance.delete('users/sign_out'),
    register: (data) => instance.post('users', data),
  },
  profile: {
    setNotificationSettings: (data) => instance.post('api/users/set_notification_settings', data),
  },
  notifications: {
    getAll: (data) => instance.get('api/notifications', data),
    updateStatus: () => instance.get('api/notifications/update_status'),
    sendMailNotification: (data) => instance.post('api/users/send_mail_notification', data),
  },
  files: {
    getAll: () => instance.get('api/files'),
    create: (data) => instance.post('api/files', data),
    destroy: (id) => instance.delete(`api/files/${id}`),
  },
  s3: {
    getPresignedUrl: (data) => instance.post('api/files/get_presigned_url', data),
    uploadFile: (file, presignedUrl) => new Promise((resolve, reject) => {
      infoToast('File upload started!');
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', presignedUrl);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(errorToast(`error uploading ${file.type} to S3: ${xhr.status}`));
          }
        }
      };
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    }),
  }
};

export default api;
