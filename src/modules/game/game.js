import dom from '../dom/dom';
import gameboard from '../../factories/gameboard/gameboard';
import player from '../../factories/player/player';

const game = (() => {
	const gameboard1 = gameboard(10);
	const gameboard2 = gameboard(10);
	const player1 = player();
	const player2 = player();
	const mainPlayer = 'player1';

	const _randomPlaceShips = () => {
		player1.randomPlaceShips(gameboard1);
		player2.randomPlaceShips(gameboard2);
	};

	const init = () => {
		_randomPlaceShips();
		dom.renderGameboards({
			player1: {
				gameboard: gameboard1,
				renderTo: dom.gameboard1Container,
				isMainPlayer: mainPlayer === 'player1' ? true : false,
			},
			player2: {
				gameboard: gameboard2,
				renderTo: dom.gameboard2Container,
				isMainPlayer: mainPlayer === 'player2' ? true : false,
			},
		});
	};

	return { init };
})();

export default game;
