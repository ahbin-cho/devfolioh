import classNames from 'classnames/bind';

/*Internal */
import styles from './Home.module.scss';
import MenuBar from '@components/HomePage/MenuBar';
import PostGrid from '@components/HomePage/PostGird/PostGrid';
import SubBar from '@components/HomePage/SubBar';
import { useEffect, useState } from 'react';
import { APostType } from 'src/typings/apost.interface';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
const cx = classNames.bind(styles);

function Home() {
  let [posts, setPosts] = useState<APostType[]>([]);
  let [pageNumber, setPageNumber] = useState<number>(1);
  let [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=12&page=${pageNumber}`,
      )
      .then((res) => {
        setPosts(res.data.results);
        setPageNumber(pageNumber + 1);
        if (res.data.totalResults === res.data.results.length) {
          setHasMore(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getItemList = () => {
    axios
      .get(
        `https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=12&page=${pageNumber}`,
      )
      .then((res) => {
        setPosts([...posts, ...res.data.results]);
        setPageNumber(pageNumber + 1);
        if (res.data.totalResults <= posts.length + res.data.results.length) {
          setHasMore(false);
        }
      });
  };

  return (
    <div className={cx('home')}>
      <div className={cx('list')}>
        <MenuBar />
        <div className={cx('post-list')}>
          <SubBar />
          <InfiniteScroll
            dataLength={posts.length}
            next={getItemList}
            hasMore={hasMore}
            loader={<ClipLoader />}
          >
            <PostGrid pages={posts} />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Home;
