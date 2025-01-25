import React, {
  useRef, useState,
} from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { blogUpdate } from '../store/actions/blogUpdate';

function UpdateCard() {
  const { blogId, userId } = useParams();
  const fileInputRef = useRef();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!file || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('file', file);

    try {
      const createBlogResult = await dispatch(blogUpdate({ userId, blogId, message: formData }));
      if (createBlogResult.meta.requestStatus === 'fulfilled') {
        alert('Blog updated successfully!');
        setMessage('');
        setFile(null);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add entry.');
    }
  };

  return (
    <div className="home__add__post">
      <h2>Update your blog</h2>
      <form onSubmit={handleUpdate}>
        <textarea
          placeholder="Write something..."
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="custom__file__input">
          <Button variant="outlined" onClick={handleFileClick}>
            Upload Media
          </Button>
          <input
            type="file"
            accept="image/*,video/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <Button variant="outlined" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

export default UpdateCard;
