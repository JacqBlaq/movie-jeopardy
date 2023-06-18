import { Injectable } from '@angular/core';
import { CategoryBase, ICategory } from '../models/question.type';
import categoryJson from '../../assets/data/game-questions.json';
import gameRulesJson from '../../assets/data/game-rules.json';

@Injectable({
	providedIn: 'root',
})

/** Service responsible for Gameboard functions */
export class GameboardService {

	/** Rules of the game. */
	rules: string[] = gameRulesJson;

	/** Every category with their respective questions. */
	static categories: ICategory[] = categoryJson;

	/**
	 * Get the `id` and `label` of every category.
	 * @returns {CategoryBase[]} The `id` and `label` of every category.
	 */
	static boardCategories(): CategoryBase[] {
		return this.categories.map(cat => {
			return { id: cat.id, label: cat.label };
		});
	}

}
