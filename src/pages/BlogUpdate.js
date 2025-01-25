import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import { userData } from '../store/actions/userData';
import { isImage, isVideo } from '../helpers/functions';
import Wrapper from '../components/commons/Wrapper';
import { blogData } from '../store/actions/blogData';
import UpdateCard from '../components/UpdateCard';

function BlogUpdate() {
  const { blogId } = useParams();
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogData.list);

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

  useEffect(() => {
    if (blogId) {
      dispatch(blogData(blogId));
    }
  }, [dispatch, blogId]);

  return (
    <Wrapper>
      <div className="container">
        <div className="blog__update">
          <h1>Your Blog</h1>
          <Card sx={{ maxWidth: 345 }} style={{ position: 'relative' }}>
            {blog?.mediaPath && (
              <CardContent>
                {isImage(blog?.mediaPath) && (
                  <>
                    <img
                      src={`https://crud-backend-hw5f.onrender.com/${blog?.mediaPath}`}
                      alt="Media"
                    />
                    <img
                      src={`https://crud-backend-hw5f.onrender.com/${blog?.mediaPath}`}
                      alt="Media"
                    />
                  </>
                )}
                {isVideo(blog?.mediaPath) && (
                  <>
                    <span />
                    <video
                      src={`https://crud-backend-hw5f.onrender.com/${blog?.mediaPath}`}
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
                {blog?.users?.userName}
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
                  {blog?.message}
                </AccordionDetails>
              </Accordion>
            </CardContent>
            <Typography gutterBottom variant="h7" component="div">
              {moment(blog?.updatedAt).calendar()}
            </Typography>
          </Card>
          <UpdateCard />
        </div>
      </div>
    </Wrapper>
  );
}

export default BlogUpdate;
