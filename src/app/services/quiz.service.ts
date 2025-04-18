import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, Category, QuizResult } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'https://opentdb.com';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ trivia_categories: Category[] }> {
    return this.http.get<{ trivia_categories: Category[] }>(`${this.baseUrl}/api_category.php`);
  }

  getQuestions(category: number, difficulty: string, amount: number): Observable<{ results: Question[] }> {
    return this.http.get<{ results: Question[] }>(
      `${this.baseUrl}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
  }

  saveResult(result: QuizResult): void {
    const results = this.getResults();
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
  }

  getResults(): QuizResult[] {
    const results = localStorage.getItem('quizResults');
    return results ? JSON.parse(results) : [];
  }
}