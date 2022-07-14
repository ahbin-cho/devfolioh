import classNames from 'classnames/bind';
// import { APostType } from '@models/apost.interface';
import { APostType } from 'src/typings/apost.interface';
import styles from './Post.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostAPI } from '@api/postAPI';
import { ACommentType } from '@typings/acomment.interface';
const cx = classNames.bind(styles);

interface PostProps {
  post: APostType;
}

function Post({ post }: PostProps) {
  const [link, setLink] = useState<string>('');
  const [thumbnailLink, setThumbnailLink] = useState<string>('');
  const [createDate, setCreateDate] = useState<string>('');
  const [comment, setComment] = useState<ACommentType[]>([]);

  const postId: string = post.id;
  const date: string = post.createdAt;

  useEffect(() => {
    setLink(`/post/${postId}`);
    PostAPI.getComments(postId).then((data) => {
      setComment(data.results);
    });

    if (post.thumbnail === undefined || post.thumbnail === '') {
      setThumbnailLink(
        'https://cdn.imweb.me/upload/S201712205a3a0910b89f5/a2470afad8a92.jpg',
      );
    } else {
      setThumbnailLink(post.thumbnail);
    }

    const postDate = date.substring(0, 10).split('-');
    setCreateDate(`${postDate[0]}년 ${postDate[1]}월 ${postDate[2]}일`);
  }, [link, postId, thumbnailLink, post.thumbnail, createDate, date]);

  return (
    <div className={cx('post')}>
      <Link to={link}>
        <div className={cx('post-box')}>
          <div className={cx('post-img')}>
            <img
              src={thumbnailLink}
              alt="thumbnail"
              className={cx('thumbnail')}
            ></img>
          </div>
          <div className={cx('info')}>
            <div className={cx('main-info')}>
              <h4 className={cx('title')}>{post.title}</h4>
              <div className={cx('sub-title')}>
                <p>{post.body}</p>
              </div>
            </div>
            <div className={cx('sub-info')}>
              <span>{createDate}</span>
              <span className={cx('seperator')}>·</span>
              <span>{comment.length}개의 댓글</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
