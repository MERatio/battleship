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

	const _disableGameboard = (gameboardName) => {
		const gameboardDiv = body.querySelector(`[data-name=${gameboardName}]`);
		gameboardDiv.classList.add('disabled-gameboard');
	};

	const _enableGameboard = (gameboardName) => {
		const gameboardDiv = body.querySelector(`[data-name=${gameboardName}]`);
		gameboardDiv.classList.remove('disabled-gameboard');
	};

	const removeOptions = (handleStartClick) => {
		start.removeEventListener('click', handleStartClick);
		start.remove();
	};

	const init = (playersInfo, handleStartClick) => {
		dom.renderGameboard(playersInfo.player1);
		_enableGameboard('gameboard1');
		start.addEventListener('click', handleStartClick);
	};

	return {
		gameboard1Container,
		gameboard2Container,
		renderGameboard,
		removeOptions,
		init,
	};
})();

export default dom;
