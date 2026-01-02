package com.example.todo.service;

import com.example.todo.repository.TodoRepository;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.todo.model.Todo;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Todo create(Todo todo) {
        if (todo.getProgress() == null) {
            todo.setProgress(Todo.Progress.TODO);
        }
        return todoRepository.save(todo);
    }

    public Todo findById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found: " + id));
    }

    public void delete(Long id) {
        todoRepository.deleteById(id);
    }

    public Todo update(Long id, Todo updated) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        todo.setTitle(updated.getTitle());
        todo.setProgress(updated.getProgress());
        todo.setDescription(updated.getDescription());
        todo.setDeadline(updated.getDeadline());
        todo.setPriority(updated.getPriority());
        return todoRepository.save(todo);
    }
}
