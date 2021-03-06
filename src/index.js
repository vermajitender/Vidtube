import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import Video_List from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAWSpA4wa4BNnSW4rkPBg0YpEVenyBFv4A';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};
		
		this.videoSearch('BB ki vines');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]				
			});
		});
	}
	
	render() {
	const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<Video_List 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container')); 