import classNames from 'classnames/bind';
import styles from './form.module.scss';
import { IoImagesOutline } from 'react-icons/io5';
import { useRef } from 'react';
import { useParams } from 'react-router';

interface FormProps {
  toggleForm: boolean;
  handleToggleForm: () => void;
  onSubmitPost: (e: React.FormEvent<HTMLFormElement>) => void;
  onSubmitPatch: (e: React.FormEvent<HTMLFormElement>) => void;
  handleThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveThumbnail: React.MouseEventHandler<HTMLButtonElement>;
  bodySumamry?: string;
  thumbnail?: string;
  loading: boolean;
}

const cx = classNames.bind(styles);

function Form({
  toggleForm,
  handleToggleForm,
  onSubmitPost,
  onSubmitPatch,
  handleThumbnail,
  handleRemoveThumbnail,
  bodySumamry,
  thumbnail,
  loading,
}: FormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { postId } = useParams();

  const openFileSelector = () => {
    if (inputRef.current) {
      inputRef?.current.click();
    }
  };

  return (
    <form
      className={cx('form__container', toggleForm ? 'view' : '')}
      onSubmit={postId ? onSubmitPatch : onSubmitPost}
    >
      <div className={cx('form__wrapper')}>
        <h3>포스트 미리보기</h3>
        {thumbnail && (
          <div className={cx('thumbnail__edit__btn')}>
            <button onClick={openFileSelector} type="button">재업로드</button>
            <button onClick={handleRemoveThumbnail}>삭제</button>
          </div>
        )}
        <div className={cx('thumbnail')}>
          {loading && (
            <div className={cx('loading')}>
              <div className={cx("lds-ring")}><div></div><div></div><div></div><div></div></div>
            </div>
          )}
          {thumbnail ? (
            <img className={cx('thumbnail__img')} src={thumbnail} alt={thumbnail} />

          ) : (
            <>
              <IoImagesOutline className={cx('thumbnail__icons')} />
              <button
                className={cx('thumbnail__button')}
                onClick={openFileSelector}
                type="button"
              >
                썸네일 업로드
              </button>
            </>
          )}
          <input
            type="file"
            id="thumbnail"
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={handleThumbnail}
          />
        </div>
        <textarea className={cx('summary')} placeholder='당신의 포스트를 짧게 소개해보세요...' value={bodySumamry} readOnly />
        <div className={cx(
          'text__counter',
          bodySumamry?.length === 150 && 'max'
        )}>{bodySumamry?.length} / 150</div>
        <div className={cx('form__submit')}>
          <button className={cx('cancel')} type="button" onClick={handleToggleForm}>취소</button>
          <button className={cx('submit')} type="submit">{postId ? '수정하기' : '제출하기'}</button>
        </div>
      </div>
    </form >
  );
}

export default Form;
