import dom from '../dom/dom';
import gameboard from '../../factories/gameboard/gameboard';

const game = (() => {
	const gameboard1 = gameboard(10);
	const gameboard2 = gameboard(10);

	const init = () => {
		dom.renderGameboards({
			player1: {
				gameboard: gameboard2,
				renderTo: dom.gameboard1Container,
			},
			player2: {
				gameboard: gameboard2,
				renderTo: dom.gameboard2Container,
			},
		});
	};

	return { init };
})();

export default game;
