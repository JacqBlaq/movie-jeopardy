import { Theme } from "./theme.type";

export type Player = {
	id: number;
	name: string;
	avatar?: string;
	score?: number;
};

// export interface IActivePlayer extends Player {
// 	index: number;
// }

export interface IPlayerCard extends Player {
	theme?: Theme;
}
