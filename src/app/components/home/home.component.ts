import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Category } from '../../models/quiz.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="quiz-container">
        <h1 class="text-center mb-4">Welcome to Quiz Game</h1>
        <div class="category-select">
          <label class="form-label">Select Category</label>
          <select
            [(ngModel)]="selectedCategory"
            class="form-select"
          >
            <option [ngValue]="null">Choose a category</option>
            <option *ngFor="let category of categories" [value]="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="difficulty-select">
          <label class="form-label">Select Difficulty</label>
          <select
            [(ngModel)]="selectedDifficulty"
            class="form-select"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          (click)="startQuiz()"
          [disabled]="!selectedCategory"
          class="btn btn-primary w-100"
        >
          Start Quiz
        </button>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: number | null = null;
  selectedDifficulty: string = 'easy';

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.quizService.getCategories().subscribe(
      response => this.categories = response.trivia_categories
    );
  }

  startQuiz() {
    if (this.selectedCategory) {
      this.router.navigate(['/quiz'], {
        queryParams: {
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty
        }
      });
    }
  }
}