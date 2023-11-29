import Animation from "../../lib/Animation.js";
import { context } from "../globals.js";
import Panel from "./elements/Panel.js";
import UserInterfaceElement from "./UserInterfaceElement.js";

export default class PokemonLevelUpPanel extends Panel {
	constructor(oldValues, pokemon) {
		super(
			Panel.POKEMON_STATS.x,
			Panel.POKEMON_STATS.y,
			Panel.POKEMON_STATS.width,
			Panel.POKEMON_STATS.height,
		);
        //`Health: ${oldValues.health} > ${pokemon.health} Attack: ${oldValues.attack} > ${pokemon.attack} Defense: ${oldValues.defense} > ${pokemon.defense} Speed: ${oldValues.speed} > ${pokemon.speed}`,

		this.pokemon = pokemon;
        this.oldValues = oldValues;
        this.pokemon.sprites = this.pokemon.iconSprites;
		

		/**
		 * Scale the animation's speed by the Pokemon's current health.
		 * A Pokemon at full health will animate faster than at low health
		 * providing a visual indication of how "good" the Pokemon is feeling.
		 */
		this.animation = new Animation([0, 1], 1 - (this.pokemon.currentHealth / this.pokemon.health) + 0.2);
		this.font = `${UserInterfaceElement.FONT_SIZE}px ${UserInterfaceElement.FONT_FAMILY}`;
	}

	update(dt) {
		this.animation.update(dt);
	}

	render() {
		super.render();

		context.save();
		context.translate(this.position.x, this.position.y);
        this.renderHeader()
		this.renderLabels();
		this.renderValues();
		context.restore();
	}

    renderHeader() {
		context.font = this.font;
		context.fillText(`Lv${this.pokemon.level}`, 20, 40);
		context.textAlign = 'center';
		context.fillText(`${this.pokemon.name}`, this.dimensions.x / 2, 40);
		this.pokemon.sprites[this.animation.getCurrentFrame()].render(this.dimensions.x - 70, -10);
	}

	renderLabels() {
		context.textAlign = 'left';
		[
			'HP:',
			'Attack:',
			'Defense:',
			'Speed:',
		].forEach((text, index) => context.fillText(text, 35, index * 30 + 80));
	}

	renderValues() {
		context.textAlign = 'right';
		[
			`${this.oldValues.health} > ${this.pokemon.health}`,
			`${this.oldValues.attack} > ${this.pokemon.attack}`,
			`${this.oldValues.defense} > ${this.pokemon.defense}`,
			`${this.oldValues.speed} > ${this.pokemon.speed}`,
		].forEach((text, index) => context.fillText(text, this.dimensions.x - 35, index * 30 + 80));
	}
}