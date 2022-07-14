import classNames from 'classnames/bind';

/*Internal */
import styles from './Home.module.scss';
import MenuBar from '@components/HomePage/MenuBar';
import { PostDetail } from '@components/DetailPage';

const cx = classNames.bind( styles );

function Detail() {
    return (
        <div className={ cx( 'home' ) }>
            <div className={ cx( 'list' ) }>
                <MenuBar />
                <PostDetail/>
            </div>
        </div>
    );
}

export default Detail;
