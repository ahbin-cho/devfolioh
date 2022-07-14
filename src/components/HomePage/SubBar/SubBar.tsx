import classNames from 'classnames/bind';

import styles from './SubBar.module.scss';
import { IoTrendingUp } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsClock } from 'react-icons/bs';

const cx = classNames.bind( styles );

function SubBar() {
  return (
    <div className={cx('sub-bar')}>
      <div className={cx('sub-bar-left')}>
        <div className={cx('trending')}>
          <IoTrendingUp />
          <span>트렌딩</span>
        </div>
        <div className={cx('recent')}>
          <BsClock />
          <span>최신</span>
        </div>
        <div className={cx('trending-order')}>
          <span className={cx('order-method')}>오늘</span>
          <IoMdArrowDropdown />
        </div>
        <ul className={cx('order-list')}>
          <li>오늘</li>
          <li>이번 주</li>
          <li>이번 달</li>
          <li>올해</li>
        </ul>
      </div>
    </div>
  );
}

export default SubBar;
