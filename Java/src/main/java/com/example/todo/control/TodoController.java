package com.example.todo.control;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;

@RestController // @RestController = @Controller + @ResponseBody(戻り値をそのままHTTPレスポンスとして返すやつ)
// ResponseBodyは、returnがHTTPレスポンス(JSON になる
@RequestMapping("/api/todo")
@CrossOrigin(origins = "https://localhost:3000") // Reactポート3000からこのバックエンドのアクセスする許可
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodoAll() {
        return todoService.findAll();
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return todoService.create(todo);
    }

    @GetMapping("/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return todoService.findById(id);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo) { // RequestBodyはフロントからデータを受け取る、だから引数に入れる
        return todoService.update(id, todo);
    }

    // DeleteMappingの()内のIdはフロント（todoServise.ts）がこのメソッドに到達できるようにするための看板のようなもの
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { // 引数のidは、実際にこのメソッドがどのidを持つレコードを消すかを判断するためのもの
        todoService.delete(id);
    }

//     @DeleteMapping("/{id}") // URL側は "id" のまま
// public void delete(@PathVariable Long todoId) { 
//     todoService.delete(todoId);
// }
// ↑このような、mappingと引数でid名が違う場合、
// public void delete(@PathVariable("id") Long todoId) { ... }
// または @PathVariable(name = "id")　　　のように書く。リファクタなどであえてidを変えたかったんだなとわかる

}
