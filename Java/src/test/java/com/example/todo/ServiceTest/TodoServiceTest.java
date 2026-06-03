package com.example.todo.ServiceTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.todo.repository.TodoRepository;
import com.example.todo.service.TodoService;
import com.example.todo.model.Todo;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock // このアノテーションをつけているから、saveメソッドを使っても、実際にDBに保存されたりしない。
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @Test
    @DisplayName("登録ができること")
    void todoCreateTest() {
        // 準備
        Todo inputTodo = new Todo();
        inputTodo.setTitle("こんにちは");
        // createをして初めてnullであるprogressがTODOになるので、今の時点ではprogressはnull。

        // mock
        Todo savedTodo = new Todo();
        savedTodo.setId(1L);
        savedTodo.setTitle("こんにちは");
        when(todoRepository.save(any())).thenReturn(savedTodo);
        // todoRepositoryは@Mockなのでsave()はnullを返してしまう。
        // なので、save()を呼んだら、返り値はsavedTodoだよと教えてあげる。
        // モック（when().thenReturn(savedTodo)）の役割は、「実際のDB（Repository）がやってくれるはずの動き」をシミュレートすることです。

        // 実行
        Todo result = todoService.create(inputTodo);
        // なので、このcreate(inputTodo)は、createのreturnでsave()を使っている。よって右辺はsavedTodoになってしまっている。(whenメソッドによって)

        // 検証の直前に追加してみてください
        System.out.println("inputTodoのID: " + inputTodo.getId());
        System.out.println("savedTodoのID: " + savedTodo.getId());
        System.out.println("resultのID: " + result.getId());

        // 検証
        // assertEquals(expected, actual);
        assertEquals(savedTodo.getId(), result.getId()); // 理屈ではsavedTODOのidとresultのidが同じであることを、実際に確認する。createメソッドがnullで帰ってきてないかとか。
        assertEquals(Todo.Progress.TODO, inputTodo.getProgress());
    }

    @Test
    @DisplayName("登録時にProgressがTODO以外にならないこと")
    void todoCreateTestWithStoppingProgress() {
        // 準備
        Todo stoppingTodo = new Todo();
        stoppingTodo.setProgress(Todo.Progress.STOPPING);

        // mock
        Todo savedTodo = new Todo();
        savedTodo.setId(1L);
        savedTodo.setTitle("こんにちは");
        when(todoRepository.save(any())).thenReturn(savedTodo);

        // 実行
        Todo stoppingResult = todoService.create(stoppingTodo);

        // 検証
        assertEquals(savedTodo.getId(), stoppingResult.getId());
        assertEquals(Todo.Progress.TODO, stoppingTodo.getProgress());
    }

    @Test
    @DisplayName("変更ができること")
    void todoChange() {
        // 準備
        Todo registerdTodo = new Todo();
        registerdTodo.setId(1L);
        registerdTodo.setTitle("タイトル");
        registerdTodo.setDeadline(LocalDateTime.of(2030, 3, 22, 10, 30));
        
        Todo changingTodo = new Todo();
        changingTodo.setId(1L);
        changingTodo.setTitle("変更後です");
        registerdTodo.setDeadline(LocalDateTime.of(2030, 3, 22, 10, 30));

        // mock
        Todo savedTodo = new Todo();
        savedTodo.setId(1L);
        savedTodo.setTitle("変更後です");
        when(todoRepository.findById(any())).thenReturn(Optional.of(registerdTodo));
        when(todoRepository.save(any())).thenReturn(savedTodo);

        // 実行
        Todo changingResult = todoService.update(savedTodo.getId(), changingTodo);

        // 検証
        assertEquals(savedTodo.getId(), changingResult.getId());
        assertEquals(changingTodo.getTitle(), registerdTodo.getTitle());
        assertEquals(LocalDateTime.of(2030, 3, 22, 10, 30), registerdTodo.getDeadline());
    }
}