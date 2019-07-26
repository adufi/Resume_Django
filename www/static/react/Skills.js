// skills = {'data': [
// 	{'name': '', 	'level': {'en': '', 'fr': ''}, 'targets': [{'en': '', 'fr': ''}]},
// 	{'name': '', 	'level': {'en': '', 'fr': ''}, 'targets': [{'en': '', 'fr': ''}]},
// 	{'name': '', 	'level': {'en': '', 'fr': ''}, 'targets': [{'en': '', 'fr': ''}]},
// 	{'name': '', 	'level': {'en': '', 'fr': ''}, 'targets': [{'en': '', 'fr': ''}]},
// 	{'name': '', 	'level': {'en': '', 'fr': ''}, 'targets': [{'en': '', 'fr': ''}]},
// 	{'name': '', 	'level': {'en': '', 'fr': ''}, 'targets': [{'en': '', 'fr': ''}]},
// ]}

class Skills extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoaded: false,
			bio: '',
			local: 'fr',
			skills: [],
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
		fetch('http://127.0.0.1:8000/api/skill')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						skills: result.results
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
	}


	set_local = (local) => {
		this.setState({ local: local });
	};


	skill_tab() {
		const skills = this.state.skills;

		var table = [];

			// Create table head
			var s_skill, s_level, s_type = '';

			switch (this.state.local) {
				case 'fr':
					s_skill = 'Competence';
					s_level = 'Niveau';
					s_type = 'Type';
					break;

				case 'en':
					s_skill = 'Skill';
					s_level = 'Level';
					s_type = 'Type';
					break;
			}

			table.push(
				<thead key="0">
					<tr>
						<th></th>
						<th>{ s_skill }</th>
						<th>{ s_level }</th>
						<th>{ s_type }</th>
					</tr>
				</thead>
			);

			// Create table body
			// 	'level': {'en': '', 'fr': ''}
			// 	'target': [{'en': '', 'fr': ''}]
			// 
			var tbody = []

			for (var i = 0; i < skills.length; ++i) {
				var item = skills[i];

				tbody.push(
					<tr key={item.name}>
						<td><div className="arrow arrow-right"></div></td>
						<td>{item.name}</td>
						<td>
							{ this.level_to_html(item.level) }
						</td>
						<td>
							{ this.targets_to_html(item.targets) }
						</td>
					</tr>
				);
			}

			table.push(
				<tbody key="1">
					{tbody}
				</tbody>
			);


		return table;
	}


	level_to_html(level) {
		const level_html = this.strip_data( level[ this.state.local ] );
		const level_class = this.strip_data( level.en );

		return <span className={ level_class }>{ level_html }</span>
	}


	targets_to_html(targets) {
		var spans = [];

		for (var i = 0; i < targets.length; ++i) {
			const item = this.strip_data( targets[i].target[ this.state.local ] );
			const item_class = this.strip_data( targets[i].target.en );

			if (i != 0)
				spans.push( <span key={ i } className='sep'> / </span> );

			spans.push(
				<span key={ (i * 10) } className={ item_class }>{ item }</span>
			);
		}
		return spans;
	}

	strip_data(item) {
		return item.replace('<p>', '').replace('</p>', '');
	}


	render() {
		const {error, isLoaded, bio, skills} = this.state;
		if (error) {
			return <div>Error: {error.message}</div>
		}
		else if (!isLoaded) {
			return <div>Loading ...</div>
		}
		else {
			return (
				<table>
					{ this.skill_tab() }
				</table>
			)	
		}
	}
}
