import React, {
  useEffect, useRef, useState,
} from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../store/actions/createBlog';
import { userData } from '../store/actions/userData';

function NewCard() {
  const fileInputRef = useRef();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const user = useSelector((state) => state.userData.data.user);

  useEffect(() => {
    if (token) {
      dispatch(userData(token));
    }
  }, [dispatch, token]);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      if (!file || !message) {
        alert('Please fill in all fields.');
        return;
      }

      const formData = new FormData();
      formData.append('message', message);
      formData.append('file', file);

      try {
        const createBlogResult = await dispatch(createBlog({ userId: user?.id, message: formData }));
        if (createBlogResult.meta.requestStatus === 'fulfilled') {
          alert('Blog created successfully!');
          setMessage('');
          setFile(null);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to add entry.');
      }
    } else {
      alert('Please log in to add your blog.');
    }
  };

  return (
    <div className="home__add__post">
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write something..."
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
          Add
        </Button>
      </form>
    </div>
  );
}

export default NewCard;
