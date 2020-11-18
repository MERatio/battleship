import gameboard from '../../components/gameboard/gameboard';
import game from '../game/game';

const dom = (() => {
	const body = document.body;
	const root = document.getElementById('root');
	const app = document.querySelector('.app');
	const gameboards = document.querySelector('.gameboards');
	const gameboard1Container = document.querySelector('.gameboard1Container');
	const gameboard2Container = document.querySelector('.gameboard2Container');
	const start = document.getElementById('start');
	const randomise = document.getElementById('randomise');

	const renderGameboard = (playerInfo, handleCellAttack = null) => {
		playerInfo.renderTo.innerHTML = '';
		playerInfo.renderTo.appendChild(
			gameboard(
				playerInfo.gameboard,
				playerInfo.name,
				playerInfo.isDisabled(),
				playerInfo.isMainPlayer,
				handleCellAttack
			)
		);
	};

	const enableGameboard = (gameboardName) => {
		const gameboardDiv = body.querySelector(`[data-name=${gameboardName}]`);
		gameboardDiv.classList.remove('disabled-gameboard');
	};

	const removeOptions = (handleStartClick, handleRandomiseClick) => {
		start.removeEventListener('click', handleStartClick);
		start.remove();
		randomise.removeEventListener('click', handleRandomiseClick);
		randomise.remove();
	};

	const init = (playersInfo, handleStartClick, handleRandomiseClick) => {
		dom.renderGameboard(playersInfo.player1);
		enableGameboard('gameboard1');
		start.addEventListener('click', handleStartClick);
		randomise.addEventListener('click', handleRandomiseClick);
	};

	return {
		gameboard1Container,
		gameboard2Container,
		renderGameboard,
		enableGameboard,
		removeOptions,
		init,
	};
})();

export default dom;
