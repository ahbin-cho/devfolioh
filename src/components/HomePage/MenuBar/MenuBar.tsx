import classNames from 'classnames/bind';

/*Internal */
import styles from './MenuBar.module.scss';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuBar() {
  const navigate = useNavigate();
  return (
    <div className={cx('top')}>
      <div className={cx('menu-bar')}>
        <div className={cx('menu-bar-left')}>
          <Link to="/">
            <span className={cx('company-logo')}>velog</span>
          </Link>
        </div>
        <div className={cx('menu-bar-right')}>
          <Link to="/" className={cx('search')}>
            <IoSearchOutline />
          </Link>
          <button className={cx('new-post-btn')} onClick={() => navigate('/write')}>새 글 작성</button>
          <div className={cx('user')}>
            <img
              className={cx('user-profile')}
              src="https://avatars.githubusercontent.com/u/67946956?v=4"
              alt="profile"
            ></img>
            <IoMdArrowDropdown className={cx('drop-down')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
