import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import Wrapper from '../components/commons/Wrapper';
import MediaCard from '../components/Card';
import { blogList } from '../store/actions/blogList';
import NewCard from '../components/NewCard';

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.blogList.list);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(blogList());
      setLoading(false);
    })();
  }, [dispatch]);
  return (
    <Wrapper>
      <div className="home">
        <div className="container">
          <h1>Welcome to the blog!</h1>
          <NewCard />
          {loading ? (
            <div className="loading">
              <PulseLoader color="#0b3c7e" />
            </div>
          ) : (
            <div className="home__blogs">
              {list.map((blog) => (
                <MediaCard
                  key={blog.id}
                  blogId={blog.id}
                  authorName={blog.users.userName}
                  message={blog.message}
                  createDate={blog.updateAt}
                  mediaPath={blog.mediaPath}
                  userId={blog.userId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
