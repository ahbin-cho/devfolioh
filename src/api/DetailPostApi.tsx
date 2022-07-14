import axios from "axios";

const baseURL = 'https://limitless-sierra-67996.herokuapp.com/v1';

export default class DataManager {
    static async getPostOne( postId:string ) {
        try {
            const response = await axios.get( `${ baseURL }/posts/${ postId }` );
            return response.data;
        } catch ( error:any ) {
            throw new Error( error.response.data.message )
        }
    };

    static async getComments( postId:string ) {
        try {
            const response = await axios.get( `${ baseURL }/comments`,{ params: { postId } });
            return response.data;
        } catch ( error:any ) {
            throw new Error( error.response.data.message )
        }
    };

    static async postCommentOne( body:{postId:string, body:string}) {
        try {
            const response = await axios.post( `${ baseURL }/comments`, body );
            return response.data;
        } catch ( error:any ) {
            throw new Error( error.response.data.message )
        }
    }

    static async deletePostOne( postId:string ) {
        try {
            const response = await axios.delete( `${ baseURL }/posts/${ postId }` );
            return response.data;
        } catch ( error:any ) {
            throw new Error( error.response.data.message )
        }
    }

    static async deleteCommentOne( commentId:string ) {
        try {
            const response = await axios.delete( `${ baseURL }/comments/${ commentId }` );
            return response.data;
        } catch ( error:any ) {
            throw new Error( error.response.data.message )
        }
    }

}