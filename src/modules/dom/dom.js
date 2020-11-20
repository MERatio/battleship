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

	const renderGameboard = (
		playerInfo,
		handleCellAttack = null,
		handleShipDragStart = null,
		handleCellDrop = null,
		handleShipClick = null
	) => {
		playerInfo.renderTo.innerHTML = '';
		playerInfo.renderTo.appendChild(
			gameboard(
				playerInfo.gameboard,
				playerInfo.name,
				playerInfo.isDisabled(),
				playerInfo.isMainPlayer,
				handleCellAttack,
				handleShipDragStart,
				handleCellDrop,
				handleShipClick
			)
		);
	};

	const enableGameboard = (gameboardName) => {
		const gameboardDiv = body.querySelector(`[data-name=${gameboardName}]`);
		gameboardDiv.classList.remove('disabled-gameboard');
	};

	const disableOwnShipsClick = () => {
		const ownShips = document.querySelectorAll('[data-own-ship="true"]');
		ownShips.forEach((ownShip) => ownShip.classList.add('pointer-events-none'));
	};

	const removeOptions = (handleStartClick, handleRandomiseClick) => {
		start.removeEventListener('click', handleStartClick);
		start.remove();
		randomise.removeEventListener('click', handleRandomiseClick);
		randomise.remove();
	};

	const init = (
		playersInfo,
		handleStartClick,
		handleRandomiseClick,
		handleShipDragStart,
		handleCellDrop,
		handleShipClick
	) => {
		renderGameboard(
			playersInfo.player1,
			null,
			handleShipDragStart,
			handleCellDrop,
			handleShipClick
		);
		enableGameboard('gameboard1');
		start.addEventListener('click', handleStartClick);
		randomise.addEventListener('click', handleRandomiseClick);
	};

	return {
		gameboard1Container,
		gameboard2Container,
		renderGameboard,
		enableGameboard,
		disableOwnShipsClick,
		removeOptions,
		init,
	};
})();

export default dom;
