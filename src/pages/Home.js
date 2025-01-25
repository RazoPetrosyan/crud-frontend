import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../components/commons/Wrapper';
import MediaCard from '../components/Card';
import { blogList } from '../store/actions/blogList';
import NewCard from '../components/NewCard';

function Home() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.blogList.list);

  useEffect(() => {
    (async () => {
      await dispatch(blogList());
    })();
  }, [dispatch]);
  return (
    <Wrapper>
      <div className="home">
        <div className="container">
          <h1>Welcome to the blog!</h1>
          <NewCard />
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
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
