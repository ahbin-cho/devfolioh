
import classNames from 'classnames/bind';
import { useParams } from 'react-router';

/*Internal */
import styles from './PostDetail.module.scss';
import Content from '../Content/Content';

const cx = classNames.bind( styles );

function PostDetail() {
    const { postId='' } = useParams();
    return (

        <div className={ cx( 'post-detail-div' ) }>
            <Content postId={ postId }/>
        </div>
    );
}

export default PostDetail;
