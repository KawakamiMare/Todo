package com.example.todo.service;

import com.example.todo.repository.TodoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.todo.model.Todo;

@Service
@Transactional
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional
    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Todo create(Todo todo) {
        todo.setProgress(Todo.Progress.TODO);
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found: " + id));
        todo.setTitle(updated.getTitle());
        todo.setProgress(updated.getProgress());
        todo.setDescription(updated.getDescription());
        if (updated.getDeadline() == null && updated.getDeadline().isAfter(LocalDateTime.now())) {
            throw new RuntimeException("過去日程に変更はできません。");
        } else {
            todo.setDeadline(updated.getDeadline());
        }
        todo.setPriority(updated.getPriority());
        return todoRepository.save(todo); // ←@Transactionを書くと、これを書かなくても勝手にDBに保存される。明示的に書いてもいいけど
    }

}
