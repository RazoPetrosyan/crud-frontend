import React, { useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { userData } from '../store/actions/userData';
import { isImage, isVideo } from '../helpers/functions';
import { deleteBlog } from '../store/actions/deleteBlog';

export default function MediaCard(props) {
  const {
    authorName, message, createDate, mediaPath, userId, blogId,
  } = props;
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.data.user);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(userData(token));
    }
  }, [dispatch, token]);

  const handleDelete = useCallback(async () => {
    try {
      if (blogId && userId) {
        await dispatch(deleteBlog(blogId));
        setOpenDialog(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [blogId, userId]);

  const handleEdit = useCallback(() => {
    if (blogId && userId) {
      navigate(`/update/blog/${blogId}/${userId}`);
    }
  }, [blogId, userId]);

  return (
    <Card sx={{ maxWidth: 345 }} style={{ position: 'relative' }}>
      {mediaPath && (
        <CardContent>
          {isImage(mediaPath) && (
            <>
              <img
                src={`${mediaPath}`}
                alt="Media"
              />
              <img
                src={`${mediaPath}`}
                alt="Media"
              />
            </>
          )}
          {isVideo(mediaPath) && (
            <>
              <span />
              <video
                src={`${mediaPath}`}
                controls
              >
                <track kind="captions" src="" srcLang="en" label="English" default />
                Your browser does not support the video tag.
              </video>
            </>
          )}
        </CardContent>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {authorName}
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Show Blog</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {message}
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <Typography gutterBottom variant="h7" component="div">
        {moment(createDate).calendar()}
        {token && user?.id === userId && (
          <div className="card__edit">
            <EditIcon onClick={handleEdit} />
            <DeleteIcon onClick={handleOpenDialog} />
          </div>
        )}
      </Typography>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
