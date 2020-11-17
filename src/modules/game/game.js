import dom from '../dom/dom';
import gameboard from '../../factories/gameboard/gameboard';
import player from '../../factories/player/player';
import helpers from '../helpers/helpers';

const game = (() => {
	const gameboard1 = gameboard(10);
	const gameboard2 = gameboard(10);
	const player1 = player();
	const player2 = player();
	const mainPlayer = 'player1';
	let activePlayer = player1;
	let activeGameboard = gameboard2;
	let winner;
	const playersInfo = {
		player1: {
			gameboard: gameboard1,
			renderTo: dom.gameboard1Container,
			name: 'gameboard1',
			isDisabled() {
				return activeGameboard === gameboard2;
			},
			isMainPlayer: mainPlayer === 'player1' ? true : false,
		},
		player2: {
			gameboard: gameboard2,
			renderTo: dom.gameboard2Container,
			name: 'gameboard2',
			isDisabled() {
				return activeGameboard === gameboard1;
			},
			isMainPlayer: mainPlayer === 'player2' ? true : false,
		},
	};

	const _randomPlaceShips = (gameboard1, gameboard2) => {
		player1.randomPlaceShips(gameboard1);
		player2.randomPlaceShips(gameboard2);
	};

	const _getWinner = (gameboard1, gameboard2) => {
		if (gameboard1.areAllShipsDestroyed()) {
			return player2;
		} else if (gameboard2.areAllShipsDestroyed()) {
			return player1;
		} else {
			return null;
		}
	};

	const _switchActivePlayer = () => {
		activePlayer = activePlayer === player1 ? player2 : player1;
		activeGameboard = activeGameboard === gameboard1 ? gameboard2 : gameboard1;
	};

	const _updateGameboard = () => {
		dom.renderGameboard(playersInfo.player1);
		dom.renderGameboard(playersInfo.player2, handleCellAttack);
	};

	const _newRound = (isFirstRound, isNewPlayer) => {
		winner = _getWinner(gameboard1, gameboard2);
		if (winner) {
			_updateGameboard();
			const winnerText = winner === player1 ? 'player1' : 'player2';
			alert(`Winner is ${winnerText}`);
			return;
		}
		if (!isFirstRound && isNewPlayer) {
			_switchActivePlayer();
		}
		if (activePlayer === player2) {
			setTimeout(() => {
				const itHit = player2.randomAttack(gameboard1);
				_newRound(false, !itHit);
			}, 500);
		}
		_updateGameboard();
	};

	const _handleRandomiseClick = () => {
		gameboard1.emptyGameboard();
		player1.randomPlaceShips(gameboard1);
		dom.renderGameboard(playersInfo.player1);
		dom.enableGameboard('gameboard1');
	};

	const handleCellAttack = (e) => {
		if (winner) {
			return;
		}
		const target = e.target;
		const row = target.dataset.row;
		const col = target.dataset.col;
		const cell = activeGameboard.getGameboard()[row][col];
		if (helpers.isValidCellToAttack(cell)) {
			const itHit = activePlayer.attack(activeGameboard, row, col);
			_newRound(false, !itHit);
		}
	};

	const handleStartClick = () => {
		_newRound(true, true);
		dom.removeOptions(handleStartClick, _handleRandomiseClick);
	};

	const init = () => {
		_randomPlaceShips(gameboard1, gameboard2);
		dom.init(playersInfo, handleStartClick, _handleRandomiseClick);
	};

	return { init };
})();

export default game;
