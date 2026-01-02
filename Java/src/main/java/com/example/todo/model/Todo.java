package com.example.todo.model;

import java.lang.annotation.Inherited;
import java.time.LocalDate;
import java.time.LocalDateTime;


import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;

import javax.annotation.processing.Generated;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // getter,setterの自動生成
@NoArgsConstructor // 引数なしのコンストラクタを自動生成
@AllArgsConstructor // 全フィールドを引数にとるコンストラクタを自動生成
@Entity
@Table(name = "todos")

public class Todo {
    public enum Progress {
        TODO, IN_PROGRESS, ALMOST_DONE, DONE, STOPPING
    }
    public enum Priority {
        A, B, C
    }

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank private String title;

    @Enumerated(EnumType.STRING)
    private Progress progress = Progress.TODO; // 初期値をTODOに

    private String description;
    @FutureOrPresent private LocalDate deadline;
    private Priority priority;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedBy
    private LocalDateTime updatedAt;

    

    // @AllArgsConstructorは↓を自動生成する
    // public Todo (Long id, String title, boolean done) {
    // this.id = id;
    // this.title = title;
    // this.done = done;
    // }

    // public Long getId() {
    //     return id;
    // }

    // public String getTitle() {
    //     return title;
    // }

    // public Progress getProgress() {
    //     return progress;
    // }

    // public String getDescription() {
    //     return description;
    // }

    // public LocalDate getDeadLine() {
    //     return deadLine;
    // }
    //↑にあるような、get〇〇は、@Dataで自動生成されるので全て不要
}
