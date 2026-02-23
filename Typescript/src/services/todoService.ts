import axios from 'axios';
import {Todo} from '../types/todo';

const API_BASE_URL = '/api/todo';

const apiClient = axios.create({
    baseURL: API_BASE_URL, //何も指定しなければ、この文字列定数のurlに飛ぶ
    headers: {
        'Content-Type': 'application/json', // これは普通の文章じゃなくてJSONだよ、とバックエンドに伝えてあげる
    },
    //Authorized: Bearerや
    //X-Request-id: <uuid>なども使うことある
});

export const todoService = {
    async getAll(): Promise<Todo[]> {
        const response = await apiClient.get('');
        return  response.data;
    },
 // async と awaitを脳死でセットで丸暗記はしない 
// async(非同期)はブラウザでの動作を、重い処理中（サーバーとの通信など）にも止めない
// await（待機） はこのロジック内でデータが届くまで次の行に行かない。例えば、１５行目でgetの処理が終わってないのに、return response.dataをしない


    async create(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> { 
                                    //↑、Todo型から、id,createdAt,updatedAtを除いた型を新しく作る
                                    // 新規作成時点ではid,createdAt,updatedAtのデータは存在しなく、DBに保存した時点でできるため 
        const response = await apiClient.post<Todo>('', todo);
        return response.data;
    },
// Promiseは、あとでTodo型の返り値を渡すことを「約束」するよ、ということ。だからasyncとawaitがセットなのではなくPromiseとawaitがセット


    async update(id: number, todo: Todo): Promise<Todo> {
        const response = await apiClient.put<Todo>(`/${id}`, todo);
        return response.data;
    },
    
    async delete(id: number): Promise<void> {
        const response = await apiClient.delete(`/${id}`);
    },
};
