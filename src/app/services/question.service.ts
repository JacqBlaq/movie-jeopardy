import { Injectable } from '@angular/core';
import { Answer, ICategory, IQuestion, MultipleChoice, QuestionBase } from '../models/question.type';
import { GameboardService } from './gameboard.service';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class QuestionService {
	private readonly _CATEGORIES: ICategory[] = GameboardService.categories;
	private readonly _CATEGORIES$ = new BehaviorSubject<ICategory[]>(this._CATEGORIES);

	categories$ = this._CATEGORIES$.asObservable();

	/**
	 * Gets list of all questions.
	 * @returns All category's questions.
	 */
	private get _questions(): IQuestion<string, 'answer'>[] {
		return this._CATEGORIES.map(cat => cat.questions).flat();
	}

	/**
	 * Gets list of questions from matching category.
	 * @param id - Category `id`.
	 * @returns List of matching category's questions.
	 */
	getCategoryQuestions$(id: number): Observable<QuestionBase[]> {
		return this.categories$.pipe(
			map(categories => categories.find(cat => cat.id === id) as ICategory),
			filter((category: ICategory) => category.id === id)
		).pipe(
			map((category) => {
				return category.questions.map(ques => {
					return {
						id: ques.id,
						points: ques.points,
						categoryId: id,
						isCleared: ques.isCleared || false
					};
				})
			})
		)
	}

	/**
	 * Gets matching question.
	 * @param id - The `id` of the question.
	 * @returns Found question based on matching `id`.
	 */
	getQuestion(id: number): QuestionBase<string, 'label'> {
		let  questionBase!: QuestionBase<string, 'label'>;
		const question = this._questions.find(ques => ques.id === id);

		if (question) {
			questionBase = {
				id: question.id,
				label: question.label,
				points: question.points,
				categoryId: question.categoryId,
				isCleared: question.isCleared
			}
		}

		return questionBase;
	}

	/**
	 * Gets question's label.
	 * @param id - The `id` of the question.
	 * @returns Question's label.
	 */
	getQuestionLabel(id: number): string | undefined {
		return this._questions.find(ques => ques.id === id)?.label;
	}

	/**
	 * Gets the question's answer choices.
	 * @param id - The `id` of the question.
	 * @returns Question's answer choices.
	 */
	getChoices(id: number): Answer[] {
		return this._questions.find(ques => ques.id === id)?.choices || [];
	}

	/**
	 * Gets the question's jeopardy style prefix that displays before answer choices.
	 * @param id - The `id` of the question.
	 * @returns Question's prefix.
	 */
	getPrefix(id: number): string {
		return this._questions.find(ques => ques.id === id)?.prefix || 'What is';
	}

	/**
	 * Gets the question's correct answer.
	 * @param id - The `id` of the question.
	 * @returns Question's correct answer.
	 */
	getAnswer(id: number): MultipleChoice | string {
		return this._questions.find(ques => ques.id === id)?.answer ?? '';
	}

	/**
	 * Checks if answer submitted by user is correct.
	 * @param id - The `id` of the question.
	 * @param answer - The answer submitted by user.
	 * @returns Whether answer submitted is correct.
	 */
	isCorrectAnswer(id: number, answer: MultipleChoice | string): boolean {
		return this._questions.find(ques => ques.id === id)?.answer == answer;
	}

	/**
	 * Sees if a question is a Daily Double.
	 * @param id - The `id` of the question.
	 * @returns Whether question is a Daily Double or not.
	 */
	isDailyDouble(id: number): boolean {
		return this._questions.find(ques => ques.id === id)?.isDailyDouble || false;
	}


	/**
	 * Sees if every question has been answered.
	 * @returns Whether every question has been answered.
	 */
	allCategoriesCleared(): boolean {
		return this._CATEGORIES.every((cat) => cat.isCleared);
	}

	/**
	 * Marks a question as cleared.
	 * @param id - The `id` of the question.
	 * @param categoryId - The `id` of the category.
	 */
	markQuestionCleared(id: number, categoryId: number): void {
		const question = this._CATEGORIES.find(cat => cat.id === categoryId)
			?.questions.find(ques => ques.id === id);

		if (question) {
			question.isCleared = true;
		}
	}

	/**
	 * Marks category as cleared if every question have been answered.
	 * @param id - The `id` of the category.
	 */
	markCategoryCleared(id: number): void {
		const category = this._CATEGORIES.find((cat) => cat.id === id);

		if (category) {
			category.isCleared = category.questions.every((ques) => ques.isCleared);
		}
	}

	/** Ramdomly sets the `Daily Double`question in each category. */
	setDailyDoubles(): void {
		this._CATEGORIES.forEach((cat) => {
			const randomInt = Math.floor(Math.random() * 5);
			cat.questions[randomInt].isDailyDouble = true;
		});
	}











	/**
	 * Reset 'isCleared' property in each category and question.
	 */
	resetQuestions(): void {
		this._CATEGORIES.forEach((cat) => {
			cat.questions.forEach((ques) => {
				ques.isCleared = false;
			});
		});
		this.setDailyDoubles();
	}
}
