package com.example.todo.control;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/todos")
public class TodoViewController {
    private final TodoService todoService;

    public TodoViewController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping({ "", "/" })
    public String root() {
        return "redirect:/todos/list";
    }

    @GetMapping({ "/list" })
    public String list(Model model) {
        model.addAttribute("todos", todoService.findAll());
        model.addAttribute("todoForm", new Todo());
        return "todo-list";
    }

    @PostMapping("/add")
    public String add(@ModelAttribute("todoForm") Todo todo) {
        todoService.create(todo);
        return "redirect:/todos";
    }

    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("todo", todoService.findById(id));
        return "todo-detail";
    }

    @PostMapping("/{id}/update")
    public String updateFromDatail(@PathVariable Long id, @ModelAttribute("todo") Todo formTodo) {
        todoService.update(id, formTodo);
        return "redirect:/todos/{id}";
    }

    @PostMapping("/{id}/delete")
    public String deleteFormDetail(@PathVariable Long id) {
        todoService.delete(id);
        return "redirect:/todos";
    }

}
