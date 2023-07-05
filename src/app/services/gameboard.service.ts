import { Injectable } from '@angular/core';
import { CategoryBase, ICategory } from '../models/question.type';
import categoryJson from '../../assets/data/game-questions.json';
import gameRulesJson from '../../assets/data/game-rules.json';

@Injectable({
	providedIn: 'root',
})

export class GameboardService {

	/** List of game rules. */
	rules: string[] = gameRulesJson;

	/** List of categories and their respective questions. */
	static categories: ICategory[] = categoryJson;

	/**
	 * Gets the `id` and `label` of every category.
	 * @returns The `id` and `label` of every category.
	 */
	static boardCategories(): CategoryBase[] {
		return this.categories.map(cat => {
			return { id: cat.id, label: cat.label };
		});
	}

}
