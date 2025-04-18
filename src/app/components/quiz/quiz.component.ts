import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/quiz.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="quiz-container">
        <div *ngIf="currentQuestion" class="question-card">
          <div class="text-center mb-4">
            <p class="text-muted">Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}</p>
            <div class="progress">
              <div class="progress-bar" [style.width]="progressPercentage + '%'"></div>
            </div>
          </div>

          <h2 class="mb-4" [innerHTML]="currentQuestion.question"></h2>

          <div class="d-grid gap-2">
            <button
              *ngFor="let answer of shuffledAnswers"
              (click)="checkAnswer(answer)"
              [disabled]="answerSelected"
              [class.correct]="answerSelected && answer === currentQuestion.correct_answer"
              [class.incorrect]="answerSelected && answer !== currentQuestion.correct_answer"
              class="answer-btn btn"
            >
              {{ answer }}
            </button>
          </div>

          <div *ngIf="answerSelected" class="text-center mt-4">
            <button
              (click)="nextQuestion()"
              class="btn btn-primary"
            >
              {{ isLastQuestion ? 'See Results' : 'Next Question' }}
            </button>
          </div>
        </div>

        <div *ngIf="showResults" class="text-center">
          <h2 class="mb-4">Quiz Complete!</h2>
          <div class="quiz-score">
            Score: {{ score }}/{{ questions.length }}
          </div>
          
          <div class="mb-4">
            <label class="form-label">Enter your name to save score:</label>
            <input
              type="text"
              [(ngModel)]="playerName"
              class="form-control"
              placeholder="Your name"
            >
          </div>
          
          <div class="d-grid gap-2">
            <button
              (click)="saveScore()"
              [disabled]="!playerName"
              class="btn btn-success"
            >
              Save Score
            </button>
            
            <button
              (click)="playAgain()"
              class="btn btn-primary"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  currentQuestion: Question | null = null;
  shuffledAnswers: string[] = [];
  score = 0;
  answerSelected = false;
  showResults = false;
  playerName = '';
  category = '';
  difficulty = '';

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const difficulty = params['difficulty'];
      
      if (!category || !difficulty) {
        this.router.navigate(['/']);
        return;
      }

      this.category = category;
      this.difficulty = difficulty;
      
      this.quizService.getQuestions(category, difficulty, 10).subscribe(
        response => {
          this.questions = response.results;
          this.startQuiz();
        }
      );
    });
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  startQuiz() {
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions[0];
      this.shuffleAnswers();
    }
  }

  shuffleAnswers() {
    if (this.currentQuestion) {
      this.shuffledAnswers = [
        this.currentQuestion.correct_answer,
        ...this.currentQuestion.incorrect_answers
      ].sort(() => Math.random() - 0.5);
    }
  }

  checkAnswer(answer: string) {
    if (!this.currentQuestion || this.answerSelected) return;
    
    this.answerSelected = true;
    if (answer === this.currentQuestion.correct_answer) {
      this.score++;
    }
  }

  nextQuestion() {
    this.answerSelected = false;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.shuffleAnswers();
    } else {
      this.showResults = true;
    }
  }

  saveScore() {
    if (!this.playerName) return;

    this.quizService.saveResult({
      playerName: this.playerName,
      score: this.score,
      totalQuestions: this.questions.length,
      category: this.currentQuestion?.category || '',
      difficulty: this.difficulty,
      date: new Date().toISOString()
    });

    this.router.navigate(['/history']);
  }

  playAgain() {
    this.router.navigate(['/']);
  }
}