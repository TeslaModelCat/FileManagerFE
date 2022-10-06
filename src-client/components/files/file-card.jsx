import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const FileCard = ({ file, onDelete }) => (
  <div className="file-card">
    <div className="file-name"><a href={`data:,${file.url}`} download={file.name} target="_blank" rel="noreferrer">{file.name}</a></div>
    <div className="small-cell">{file.size}</div>
    <div className="small-cell">
      <IconButton type="button" onClick={onDelete}>
        <Delete />
      </IconButton>
    </div>
  </div>
);

FileCard.propTypes = {
  file: PropTypes.instanceOf(Object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FileCard;
