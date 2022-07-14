import React from 'react';
import classNames from 'classnames/bind';
import styles from './tag.module.scss';

interface TagProps {
  children: string;
}

const cx = classNames.bind(styles);

function Tag({ children }: TagProps) {
  return <span className={cx('tag')}> {children}</span>
}

export default Tag;
