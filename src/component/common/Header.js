import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<Link to='/department'>Department</Link>
				</li>
				<li>
					<Link to='/community'>Community</Link>
				</li>
				<li>
					<Link to='/gallery'>Gallery</Link>
				</li>
				<li>
					<Link to='/youtube'>Youtube</Link>
				</li>
				<li>
					<Link to='/location'>Location</Link>
				</li>
				<li>
					<Link to='/join'>Join</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
