import gameboard from '../../components/gameboard/gameboard';

const dom = (() => {
	const root = document.getElementById('root');
	const app = document.querySelector('.app');
	const gameboards = document.querySelector('.gameboards');
	const gameboard1Container = document.querySelector('.gameboard1Container');
	const gameboard2Container = document.querySelector('.gameboard2Container');

	const _renderGameboard = (gameboardObj, renderTo) => {
		renderTo.innerHTML = '';
		renderTo.appendChild(gameboard(gameboardObj.getGameboard()));
	};

	const renderGameboards = (gameboardsData) => {
		for (let playerName in gameboardsData) {
			_renderGameboard(
				gameboardsData[playerName].gameboard,
				gameboardsData[playerName].renderTo
			);
		}
	};

	return {
		gameboard1Container,
		gameboard2Container,
		renderGameboards,
	};
})();

export default dom;
