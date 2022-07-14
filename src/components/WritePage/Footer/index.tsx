import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import classNames from 'classnames/bind';
import styles from './writeFooter.module.scss';
import useWindowDimensions from '@hooks/useWindowDemesion';

const cx = classNames.bind(styles);

interface FooterProps {
  handleToggleForm: () => void;
}

function WriteFooter({ handleToggleForm }: FooterProps) {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div className={cx('editor__footer')} style={{ width: width >= 1024 ? (width / 2) - 49 : width }}>
      <div className={cx('editor__footer-wrapper')}>
        <button className={cx("footer__button-exit")} onClick={handleGoBack}>
          <BsArrowLeft />
          <span>나가기</span>
        </button>
        <div className={cx("footer__button-wrapper")}>
          <button className={cx('button__save')}>임시저장</button>
          <button className={cx('button__submit')} onClick={handleToggleForm}>글쓰기</button>
        </div>
      </div>
    </div>
  )
}

export default WriteFooter
