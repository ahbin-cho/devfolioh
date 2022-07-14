import React from 'react';
import classNames from 'classnames/bind';
import styles from './editor.module.scss';
import WriteFooter from '@components/WritePage/Footer';
import Tag from '@components/WritePage/Tag';
import { IForm } from '@typings/write.interface';

const cx = classNames.bind(styles);



interface EditorProps {
  handleTag: React.ChangeEventHandler<HTMLInputElement>;
  addTags: React.KeyboardEventHandler<HTMLInputElement>;
  removeTags: React.KeyboardEventHandler<HTMLInputElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleToggleForm: () => void;
  tag: string;
  form: IForm,
}

function Editor({
  handleChange,
  handleTag,
  addTags,
  removeTags,
  handleToggleForm,
  tag,
  form
}: EditorProps) {
  return (
    <div className={cx('editor__container')}>
      <div className={cx('editor__wrapper')}>
        <div className={cx('editor__contents')}>
          <div className={cx('editor__contents-header')}>
            <textarea
              className={cx('editor__contents-title')}
              name="title"
              placeholder="제목을 입력하세요"
              value={form.title}
              onChange={handleChange}
            />
            <div className={cx('hr')} />
            <div className={cx('tags__wrapper')}>
              {form.tags.map((tagName, index) => <Tag key={`${index + 1}-${tagName}`}>{tagName}</Tag>)}
              <input
                className={cx('tags__input')}
                name="tag"
                placeholder="태그를 입력하세요"
                onChange={handleTag}
                onKeyPress={addTags}
                onKeyDown={removeTags}
                value={tag}
              />
            </div>
          </div>
          <div className={cx('body')}>
            <textarea
              className={cx('body__textarea')}
              name="body"
              placeholder="당신의 이야기를 적어보세요..."
              value={form.body}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <WriteFooter handleToggleForm={handleToggleForm} />
    </div>
  );
}

export default Editor;
