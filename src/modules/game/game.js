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

	const _randomPlaceShips = () => {
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
		dom.renderGameboards(
			{
				player1: {
					gameboard: gameboard1,
					renderTo: dom.gameboard1Container,
					name: 'gameboard1',
					isDisabled: activeGameboard === gameboard2,
					isMainPlayer: mainPlayer === 'player1' ? true : false,
				},
				player2: {
					gameboard: gameboard2,
					renderTo: dom.gameboard2Container,
					name: 'gameboard2',
					isDisabled: activeGameboard === gameboard1,
					isMainPlayer: mainPlayer === 'player2' ? true : false,
				},
			},
			handleCellAttack
		);
	};

	const _newRound = (isFirstRound) => {
		winner = _getWinner(gameboard1, gameboard2);
		if (winner) {
			_updateGameboard();
			// TODO: announce winner
			const winnerText = winner === player1 ? 'player1' : 'player2';
			console.log(`Winner is ${winnerText}`);
			// TODO: prevent user from clicking the gameboard if there is a winner
		} else {
			if (!isFirstRound) {
				_switchActivePlayer();
			}
			_updateGameboard();
		}
		if (activePlayer === player2) {
			setTimeout(() => {
				player2.randomAttack(gameboard1);
				_newRound(false);
			}, 500);
		}
	};

	const handleCellAttack = (e) => {
		const target = e.target;
		const gameboardName = target.dataset.gameboardName;
		const row = target.dataset.row;
		const col = target.dataset.col;
		let gameboard;
		let cell;

		if (gameboardName === 'gameboard1') {
			gameboard = gameboard1;
			cell = gameboard1.getGameboard()[row][col];
		} else {
			gameboard = gameboard2;
			cell = gameboard2.getGameboard()[row][col];
		}

		if (helpers.isValidCellToAttack(cell)) {
			gameboard.receiveAttack(row, col);
			_newRound(false);
		}
	};

	const init = () => {
		_randomPlaceShips();
		_newRound(true);
	};

	return { init, handleCellAttack };
})();

export default game;
