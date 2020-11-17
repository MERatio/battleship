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

	const _renderGameboard = (
		gameboardObj,
		renderTo,
		name,
		isDisabled,
		isMainPlayer,
		handleCellAttack
	) => {
		renderTo.innerHTML = '';
		renderTo.appendChild(
			gameboard(gameboardObj, name, isDisabled, isMainPlayer, handleCellAttack)
		);
	};

	const renderGameboards = (gameboardsData, handleCellAttack = null) => {
		for (let playerName in gameboardsData) {
			_renderGameboard(
				gameboardsData[playerName].gameboard,
				gameboardsData[playerName].renderTo,
				gameboardsData[playerName].name,
				gameboardsData[playerName].isDisabled(),
				gameboardsData[playerName].isMainPlayer,
				handleCellAttack
			);
		}
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
		renderGameboards(playersInfo);
		_enableGameboard('gameboard1');
		_disableGameboard('gameboard2');
		start.addEventListener('click', handleStartClick);
	};

	return {
		gameboard1Container,
		gameboard2Container,
		renderGameboards,
		removeOptions,
		init,
	};
})();

export default dom;
