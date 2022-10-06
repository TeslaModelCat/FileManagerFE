const fileSizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / k ** i).toFixed(dm)} ${fileSizes[i]}`;
};

export const sendMailNotification = (
  { notificationSettings }, template, store
) => {
  const listLength = store.list.filter((item) => !item.isRead).length;
  if (notificationSettings === 'every-10-notifications') {
    store.sendMailNotification({ template, sendMail: (listLength % 10) === 0, type: 'new_notifications' });
  } if (notificationSettings === 'instantly') {
    store.sendMailNotification({ template, sendMail: true });
  } else {
    store.sendMailNotification({ template, sendMail: false, type: 'new_notifications' });
  }
};

export const getMessage = (type) => {
  switch (type) {
    case 'upload_start': return 'File upload started';
    case 'upload_finish': return 'File upload finished';
    case 'file_removed': return 'File removed';
    default: return false;
  }
};

export default {
  formatBytes, sendMailNotification
};
