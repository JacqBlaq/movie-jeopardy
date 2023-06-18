import { Player } from "./player.type";

export type MultipleChoice = 'A' | 'B' | 'C' | 'D';

export type Answer = {
	option: MultipleChoice | string;
	label: string;
}

/** Model used on gameboard. */
export type CategoryBase = {
	id: number;
	label: string;
	isCleared?: boolean;
}

/**
 * Model used on Question Modal before user decides to answer question.
 * Useful so user cannot use devTools to see answer choices.
 */
export type QuestionBase<T = void, K extends string = never> = {
	[key in K]?: T;
} & {
	id: number;
	points: number;
	categoryId?: number;
	isCleared?: boolean;
}

/**
 * Model used once user choses to answer question and not pass.
 */
export type IQuestion<T = void, K extends string | never = never> = QuestionBase<string, 'label'> & {
	[key in K]: T;
} & {
	choices: Answer[];
	prefix?: string;
	isDailyDouble?: boolean;
};

/** Model used to map imported Json. */
export interface ICategory extends CategoryBase {
	questions: IQuestion<string, 'answer'>[]
}

export type QuestionModalData = {
	id: number;
	points: number;
	label: string;
	isDailyDouble?: boolean
	category: CategoryBase;
	activePlayer: Player;
}
