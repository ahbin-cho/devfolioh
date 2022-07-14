import classNames from 'classnames/bind';
import styles from './preview.module.scss';
import useWindowDimensions from '@hooks/useWindowDemesion';
import ReactMarkdown from 'react-markdown';
import { IForm } from '@typings/write.interface';

const cx = classNames.bind(styles);

interface PreviewProps {
  form: IForm;
}

function joinStringWithLineBreak(str: string): string {
  return str.split('\n').join('');
}

function Preview({ form }: PreviewProps) {
  const { width } = useWindowDimensions();

  return (
    <div
      className={cx('preview__container')}
      style={{ display: width >= 1024 ? 'flex' : 'none' }}
    >
      <div className={cx('preview__header')}>
        <ReactMarkdown children={`# ${joinStringWithLineBreak(form.title)}`} />
      </div>
      <div className={cx('preview__body')}>
        <ReactMarkdown children={form.body} />
      </div>
    </div>
  )
}

export default Preview;
