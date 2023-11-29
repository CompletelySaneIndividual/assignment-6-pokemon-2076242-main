import PokemonLevelUpPanel from "../../user-interface/PokemonLevelUpPannel.js";
import State from "../../../lib/State.js";
import { keys, sounds, stateStack } from "../../globals.js";
import SoundName from "../../enums/SoundName.js";
import Textbox from "../../user-interface/elements/Textbox.js"
import Panel from "../../user-interface/elements/Panel.js";

export default class PokemonLevelUpState extends State {
    constructor(oldValues, pokemon, callback = () => { }) {
		super();


        this.oldValues = oldValues;
		this.pokemon = pokemon;

        this.callback = callback;

		this.panel = new PokemonLevelUpPanel(oldValues, pokemon);
	}

	enter() {
		sounds.play(SoundName.MenuOpen);
	}

	update(dt) {
		this.panel.update(dt);

		if (keys.Escape || keys.Enter) {
			keys.Escape = false;
			keys.Enter = false;

            this.callback();
			stateStack.pop();
		}
	}

	render() {
		this.panel.render();
	}
}