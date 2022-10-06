import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import api from '../../api/api';
import { formatBytes, sendMailNotification } from '../../helpers';
import { useStores } from '../../stores/context';
import FileCard from './file-card';

const FilesContainer = observer(() => {
  const { filesStore, sessionStore, notificationStore } = useStores();
  const selectFileRef = useRef();

  useEffect(() => {
    filesStore.getAll();
    notificationStore.getAll();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      api.s3.getPresignedUrl({ filename: file.name, filetype: file.type }).then((res) => {
        sendMailNotification(sessionStore.user, 'upload_start', notificationStore);
        api.s3.uploadFile(file, res.data).then(() => {
          filesStore.create({ name: file.name, size: formatBytes(file.size) }).then(() => {
            sendMailNotification(sessionStore.user, 'upload_finish', notificationStore);
          });
        });
      });
    }
  };

  const handleDelete = (id) => {
    filesStore.destroy(id).then(() => {
      sendMailNotification(sessionStore.user, 'file_removed', notificationStore);
    });
  };

  return (
    <div className="col">
      <div className="files-title">Files Dashboard</div>
      <input ref={selectFileRef} type="file" onChange={handleFileUpload} style={{ width: 0, height: 0 }} />
      <div className="files-container">
        {
          toJS(filesStore.list).map((file) => (
            <FileCard
              key={file._id}
              onDelete={() => handleDelete(file._id)}
              file={file}
            />
          ))
        }
      </div>
      <button type="button" className="add-file-button" onClick={() => selectFileRef.current.click()}>Upload file</button>
    </div>
  );
});

export default FilesContainer;
