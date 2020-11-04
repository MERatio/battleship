import './style.css';
import WebpackImg from './webpack.png';

function component() {
	const div = document.createElement('div');

	const p = document.createElement('p');
	p.textContent = 'Webpack Test';
	div.appendChild(p);

	const img = new Image();
	img.src = WebpackImg;
	div.appendChild(img);

	return div;
}

document.body.appendChild(component());
