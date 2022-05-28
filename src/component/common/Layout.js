function Layout(props) {
	return (
		<section className={`content ${props.name}`}>
			<figure></figure>
			<div className='inner'>
				<h1>{props.name}</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
