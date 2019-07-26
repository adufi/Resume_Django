// var items = {'data': [
// 	{title: '', image: '', description: '', tags: ['', ''], links: [{type: '', src: ''}, {}]},
// 
// 	{title: '', image: '', description: '', tags: ['', ''], links: [{type: '', src: ''}, {}]},
// 
// 	{title: '', image: '', description: '', tags: ['', ''], links: [{type: '', src: ''}, {}]},
// 
// 	{title: '', image: '', description: '', tags: ['', ''], links: [{type: '', src: ''}, {}]},
// 
// 	{title: '', image: '', description: '', tags: ['', ''], links: [{type: '', src: ''}, {}]},
// 
// 	{title: '', image: '', description: '', tags: ['', ''], links: [{type: '', src: ''}, {}]},
// ]}


const color_set = [
	'rgb(205, 97, 85)',
	'rgb(236, 112, 99)',
	'rgb(175, 122, 197)',
	'rgb(165, 105, 189)',
	'rgb(84, 153, 199)',
	'rgb(93, 173, 226)',
	'rgb(72, 201, 176)',
	'rgb(69, 179, 157)',
	'rgb(82, 190, 128)',
	'rgb(88, 214, 141)',
	'rgb(244, 208, 63)',
	'rgb(245, 176, 65)',
	'rgb(235, 152, 78)',
	'rgb(220, 118, 51)',
	'rgb(202, 207, 210)',
	'rgb(170, 183, 184)',
	'rgb(153, 163, 164)',
	'rgb(93, 109, 126)',
	'rgb(86, 101, 115)',
];

function get_color(i) {
	const rand = Math.floor(Math.random() * color_set.length);
	return ra
}

class Projects extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			onTest: false,

			show: false,
			error: null,
			isLoaded: false,
			index: 0,
			local: 'fr',
			projects: [],
		};		
	}

	get_local() {
		const locals = ['fr', 'en'];
		const path_name = window.location.pathname;

		for (let local of locals) {
			if (path_name.includes(local))
				this.set_local(local);
		}
	}

	componentDidMount() {
		fetch('/api/projects')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						projects: result.results
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)

		this.get_local();

		// Check tests
		if (this.state.onTest)
			this.setState({ show: true , index: 0});
	}


	show_modal = () => {
		this.setState({ show: true });
	};


	hide_modal = () => {
		this.setState({ show: false });
	};


	set_local = (local) => {
		this.setState({ local: local });
	};


	set_project_index = (i) => {
		this.setState({ index: i });
	};


	scifi_nav_items() {
		const projects = this.state.projects;

		var lis = [];

			// Create li items
			for (var i = 0; i < projects.length; ++i) {
				var item = projects[i];

				lis.push(
					<li className="scifi-nav__orbit" data-count={ i } key={ item.title } onClick={ (e) => this.handle_click(e) }>
						<a className="scifi-nav__satellite" onClick={ (e) => this.handle_click(e) }>
							<span className="scifi-nav__label">{ item.title }</span>
						</a>
					</li>
				);
			}

		return lis;
	}


	// Dispatch click events by target className
	handle_click(e) {
		var sender = e.target;

		switch (sender.className) {
			case 'scifi-nav__orbit':
				this.show_modal();

				this.set_project_index(this.nav_count(sender));
				break;


			case 'scifi-nav__satellite':
				this.show_modal();

				this.set_project_index(this.nav_count(sender));
				break;


			case 'modal__bg':
				this.hide_modal();
				break;


			case 'buttons__next':
				this.change_item(true);
				break;


			case 'buttons__prev':
				this.change_item(false);
				break;


			case 'buttons__close':
				this.hide_modal();
				break;
		}
	}


	// Return 'data-count' of a 'scifi-nav' item
	// 'data-attibute' can be sent by 
	// 'scifi-nav__orbit' or 'scifi-nav__satellite'
	nav_count(sender) {
		switch (sender.className) {
			case 'scifi-nav__orbit':
				return parseInt(sender.getAttribute('data-count'));

			case 'scifi-nav__satellite':
				return parseInt(sender.parentElement.getAttribute('data-count'));

			default:
				return null;
		}
		return null;
	}


	// Change project content on left/right arrow click
	// next = true => Right
	// next = false => Left
	change_item(next) {
		var index = this.state.index += (next) ? 1 : -1;

		if (index < 0) {
			index = this.state.projects.length - 1;
		}
		else if (index == this.state.projects.length) {
			index = 0;
		}
		this.set_project_index(index);
	}


	// Build HTML Project from JSON data
	scifi_nav_project() {
		const project = this.state.projects[ this.state.index ];

		return(
			<div className="project">

				<div className="project__header">
					
					<h3 className="project__title">{ project.title }</h3>
				</div>

				<div className="project__body">

					<div className="project__image">
						<img src={ project.image } loading="lazy" />
					</div>

					<div className="project__desc" 
						 dangerouslySetInnerHTML={{ __html: project.description[ this.state.local ] }}>
						
					</div>

					<div className="project__tags">
						{ this.scifi_nav_project_tags(project.tags) }
					</div>

					<div className="project__links">
						{ this.scifi_nav_project_links(project.links) }
					</div>
				</div>		
			</div>
		)
	}


	// Build HTML tags from JSON data
	scifi_nav_project_tags(tags) {
		var list = [];
		// const random_color_start = Math.floor(Math.random() * color_set.length);
		// console.log(random_color_start);

		for (var i = 0; i < tags.length; ++i) {
			const className = 'tag ' + tags[i];

			list.push(
				<span key={ i } className={ className }>{ tags[i] }</span>
			);
		}
		return list;
	}


	// Build HTML links from JSON data
	scifi_nav_project_links(links) {
		var list = [];

		for (var i = 0; i < links.length; ++i) {

			var icon_src = '';

			switch (links[i].type) {
				case 'github':
					icon_src = '/static/img/icons/Github.png';
					break;

				case 'www':
					icon_src = '/static/img/icons/www.png';
					break;
			}
			
			list.push(
				<a className="project__links__item" href={ links[i].src } target="_blank" key={ i }>
					<img src={ icon_src } loading="lazy" />
				</a>
			);
		}
		return list;
	}


	render() {
		const {show, error, isLoaded, projects} = this.state;
		const modal_className = show ? 'scifi-nav-modal active' : 'scifi-nav-modal';

		if (error) {
			return <div>Error: {error.message}</div>
		}
		else if (!isLoaded) {
			return <div>Loading ...</div>
		}
		else {
			return (
				<div>
					<div className="scifi-nav-contener">
						<div className="scifi-nav">
							<div className="scifi-nav__system">
								{ this.scifi_nav_items() }
							</div>
							<div className="hologram"></div>
						</div>
					</div>

					<div className={modal_className}>

						<div className="modal__bg" onClick={(e) => this.handle_click(e) }></div>

						<div className="tablet">

							<div className="content">
								
								<div className="b1">

									<div className="glitches">
										
										<div className="top"></div>
										<div className="left"></div>
										<div className="right"></div>
										<div className="bottom"></div>
									</div>

									<div className="b2">

										<div className="camera"></div>

										<div className="screen">
											{ this.scifi_nav_project() }
										</div>

										<div className="buttons">
											<div className="buttons__prev" onClick={(e) => this.handle_click(e) }>&#60;</div>
											<div className="buttons__close" onClick={(e) => this.handle_click(e) }></div>
											<div className="buttons__next" onClick={(e) => this.handle_click(e) }>&#62;</div>
										</div>
									</div>
								</div>
							</div>							
						</div>					
					</div>
				</div>
			)	
		}
	}
}
