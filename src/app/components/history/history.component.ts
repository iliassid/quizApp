import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { QuizResult } from '../../models/quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="quiz-container">
        <h2 class="text-center mb-4">Quiz History</h2>
        
        <div *ngIf="results.length === 0" class="empty-state">
          <p>No quiz results yet. Take a quiz to see your history!</p>
          <button
            (click)="startNewQuiz()"
            class="btn btn-primary mt-3"
          >
            Start a Quiz
          </button>
        </div>

        <div *ngIf="results.length > 0" class="history-table table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Player</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let result of sortedResults">
                <td>{{ result.playerName }}</td>
                <td>{{ result.category }}</td>
                <td class="text-capitalize">{{ result.difficulty }}</td>
                <td>{{ result.score }}/{{ result.totalQuestions }}</td>
                <td>{{ formatDate(result.date) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class HistoryComponent implements OnInit {
  results: QuizResult[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.results = this.quizService.getResults();
  }

  get sortedResults(): QuizResult[] {
    return [...this.results].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  startNewQuiz() {
    this.router.navigate(['/']);
  }
}