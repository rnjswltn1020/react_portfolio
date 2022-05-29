import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Youtube() {
	const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
	const playlist = 'PLHtvRFLN5v-W-izd7V4JH2L4-RTW0WRi3';
	const num = 8;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.items);
		});
	}, []);

	return (
		<Layout name={'Youtube'}>
			<p>Youtbe</p>
		</Layout>
	);
}

export default Youtube;
