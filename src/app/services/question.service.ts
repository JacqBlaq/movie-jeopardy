import { Injectable } from '@angular/core';
import { Answer, ICategory, IQuestion, MultipleChoice, QuestionBase } from '../models/question.type';
import { GameboardService } from './gameboard.service';

@Injectable({
	providedIn: 'root',
})
export class QuestionService {

	/** Every category with their respective questions. */
	private readonly _CATEGORIES: ICategory[] = GameboardService.categories;

	/**
	 * Get every category's questions.
	 * @returns {IQuestion<string, 'answer'>[]} Every category's questions.
	 */
	private get _questions(): IQuestion<string, 'answer'>[] {
		return this._CATEGORIES.map(cat => cat.questions).flat();
	}

	/**
	 * Get a category's array of questions.
	 * @param {number} id - The `id` of the category.
	 * @returns {QuestionBase[]} Category's array of questions.
	 */
	getCategoryQuestions(id: number): QuestionBase[] {
		return this._CATEGORIES.find(cat => cat.id === id)
			?.questions.map(ques => {
				return {
					id: ques.id,
					points: ques.points,
					categoryId: id,
					isCleared: ques.isCleared || false
				};
			}) ?? [];
	}

	/**
	 * Get question.
	 * @param {number} id - The `id` of the question.
	 * @returns {QuestionBase} Found question based on matching `id`.
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
	 * Get the question's label.
	 * @param {number} id - The `id` of the question.
	 * @returns {string[] | undefined} Question's label.
	 */
	getQuestionLabel(id: number): string | undefined {
		return this._questions.find(ques => ques.id === id)?.label;
	}

	/**
	 * Get the question's answer choices.
	 * @param {number} id - The `id` of the question.
	 * @returns {Answer[] | undefined} Question's answer choices.
	 */
	getChoices(id: number): Answer[] {
		return this._questions.find(ques => ques.id === id)?.choices || [];
	}

	/**
	 * Get the question's jeopardy style prefix that displays before answer choices.
	 * @param {number} id - The `id` of the question.
	 * @returns {string} Question's prefix.
	 */
	getPrefix(id: number): string {
		return this._questions.find(ques => ques.id === id)?.prefix || 'What is';
	}

	/**
	 * Get the question's correct answer.
	 * @param {number} id - The `id` of the question.
	 * @returns {MultipleChoice | string} Question's correct answer.
	 */
	getAnswer(id: number): MultipleChoice | string {
		return this._questions.find(ques => ques.id === id)?.answer ?? '';
	}

	/**
	 * Checks if answer submitted by user is correct.
	 * @param {number} id - The `id` of the question.
	 * @param {MultipleChoice | string} answer - The answer submitted by user.
	 * @returns {boolean} Whether answer submitted is correct.
	 */
	isCorrectAnswer(id: number, answer: MultipleChoice | string): boolean {
		return this._questions.find(ques => ques.id === id)?.answer == answer;
	}

	/**
	 * See if a question is a Daily Double.
	 * @param {number} id - The `id` of the question.
	 * @returns {boolean} Whether question is a Daily Double or not.
	 */
	isDailyDouble(id: number): boolean {
		return this._questions.find(ques => ques.id === id)?.isDailyDouble || false;
	}


	/**
	 * Sees if every question has been answered.
	 * @returns {boolean} Whether every question has been answered.
	 */
	allCategoriesCleared(): boolean {
		return this._CATEGORIES.every((cat) => cat.isCleared);
	}

	/**
	 * Marks a question as cleared.
	 * @param {number} id - The `id` of the question.
	 * @param {number} categoryId - The `id` of the category.
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
	 * @param {number} id - The `id` of the category.
	 */
	markCategoryCleared(id: number): void {
		const category = this._CATEGORIES.find((cat) => cat.id === id);

		if (category) {
			category.isCleared = category.questions.every((ques) => ques.isCleared);
		}
	}

	/** Set the Daily Doubles randomly. */
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
