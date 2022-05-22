//common
import Header from './component/common/Header';
import Footer from './component/common/Footer';

//main
import Visual from './component/main/Visual';
import Content from './component/main/Content';

//sub
import Department from './component/sub/Department';
import Community from './component/sub/Community';
import Gallery from './component/sub/Gallery';
import Youtube from './component/sub/Youtube';
import Location from './component/sub/Location';
import Join from './component/sub/Join';

import { Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Header />

			<Route exact path='/'>
				<Visual />
				<Content />
			</Route>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;
