import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { todoService } from "../services/todoService";
import { Todo } from "../types/todo";

export const useTodos = () => {
    const queryClient = useQueryClient();

    // データの取得
    const todosQuery = useQuery({
        queryKey: ['todos'], // キャッシュのキー　キャッシュを識別するためのID。todosをくれと言われたら、サーバーに行かずに、ここに格納されているものを出す
        queryFn: todoService.getAll,// データ取得の関数
    });
    //     // 自分で全部管理しないといけない（大変！）
    // const [todos, setTodos] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //   setIsLoading(true);
    //   todoService.getAll()
    //     .then(data => setTodos(data))
    //     .catch(err => setError(err))
    //     .finally(() => setIsLoading(false));
    // }, []);
    // 　もしTanstack Queryがなかったら、↑を全部自分で描かないといけなくなる。画面描画初期時に、ロード中をtureにして、全件取得して、エラーハンドリングして...


    // データの作成
    const createTodoMutation = useMutation({
        mutationFn: todoService.create,
        onSuccess: () => {
            // 成功したら'todos'キーのキャッシュを無効化して再取得
            queryClient.invalidateQueries({ queryKey: ['todos'] }); // ①登録時に、今あるキャッシュ（['todos']）のデータを「古い(stale)」状態としてマークして
            // ②ブラウザを自動更新する。これによって、cmd + Rでリロードしなくても良くなる
        },
    });

    // データの更新
    const updateTodoMutation = useMutation({
        mutationFn: ({ id, todo }: { id: number; todo: Todo }) =>
            todoService.update(id, todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    // データの削除
    const deleteTodoMutation = useMutation({
        mutationFn: todoService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    return {
        todos: todosQuery.data ?? [], // データそのもの。データがない場合はから配列
        isLoading: todosQuery.isLoading, // 読み込み中かどうか
        isError: todosQuery.isError,
        error: todosQuery.error,
        createTodo: createTodoMutation.mutate,
        updateTodo: updateTodoMutation.mutate, //mutateという実行機能に、updateTodoという名前をつけている
        deleteTodo: deleteTodoMutation.mutate,
    }; //この書き方はJavaScriptのオブジェクトという、連想配列と実質同じやつ
}