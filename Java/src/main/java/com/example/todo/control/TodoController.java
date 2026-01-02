package com.example.todo.control;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController // @RestController = @Controller + @ResponseBody(戻り値をそのままHTTPレスポンスとして返すやつ)
@RequestMapping("/api/todo")
@CrossOrigin(origins = "https://localhost:3000") // Reactポート3000からこのバックエンドのアクセスする許可
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    @ResponseBody   
    public List<Todo> getTodoAll() {
        return todoService.findAll();
    }

    @PostMapping
    @ResponseBody
    public Todo create(@RequestBody Todo todo) {
        return todoService.create(todo);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Todo getTodo(@PathVariable Long id) {
        return todoService.findById(id);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public Todo update(@PathVariable Long id, @RequestBody Todo todo) {
        return todoService.update(id, todo);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void delete(@PathVariable Long id) {
        todoService.delete(id);
    }
}
