import State from "../../../lib/State.js";
import { stateStack, CANVAS_HEIGHT, sounds, timer} from "../../globals.js";
import Menu from "../../user-interface/elements/Menu.js";
import BattleMessageState from "./BattleMessageState.js";
import BattleState from "./BattleState.js";
import BattleTurnState from "./BattleTurnState.js";

export default class BattleMenuState extends State {
	static MENU_OPTIONS = {
		Fight: "FIGHT",
		Run: "RUN",
	}

	/**
	 * Represents the menu during the battle that the Player can choose an action from.
	 *
	 * @param {BattleState} battleState
	 */
	constructor(battleState) {
		super();

		this.battleState = battleState;

		this.playerPokemon = battleState.playerPokemon;

		const items = [
			{ text: BattleMenuState.MENU_OPTIONS.Fight, onSelect: () => this.fight() },
			{ text: BattleMenuState.MENU_OPTIONS.Run, onSelect: () => this.run() },
		];

		this.battleMenu = new Menu(
			Menu.BATTLE_MENU.x,
			Menu.BATTLE_MENU.y,
			Menu.BATTLE_MENU.width,
			Menu.BATTLE_MENU.height,
			items,
		);
	}

	update() {
		this.battleMenu.update();
		this.battleState.update();
	}

	render() {
		this.battleMenu.render();
	}

	fight() {
		stateStack.pop();
		stateStack.push(new BattleTurnState(this.battleState));
	}

	run() {
		//stateStack.push(new BattleMessageState(`You're doing great!`, 2));
		timer.tween(this.playerPokemon.position, ['y'], [CANVAS_HEIGHT], 0.2, () => {
			stateStack.push(new BattleMessageState(`${this.playerPokemon.name} Got Away Safely!`, 0, () => this.battleState.runFromBattle()));
		});
	}
}
