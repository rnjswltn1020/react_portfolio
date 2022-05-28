import { NavLink } from 'react-router-dom';

function Header() {
	const active = { color: 'aqua' };

	return (
		<header>
			<div className='inner'>
				<h1>
					<NavLink activeStyle={active} to='/'>
						LOGO
					</NavLink>
				</h1>

				<ul id='gnb'>
					<li>
						<NavLink activeStyle={active} to='/department'>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/community'>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/gallery'>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/youtube'>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/location'>
							Location
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active} to='/join'>
							Join
						</NavLink>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default Header;
