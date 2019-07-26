// socials = {'data': ''}

class Skills extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoaded: false,
			bio: '',
			skills: [],
		};
	}

	componentDidMount() {
		fetch('http://127.0.0.1:8000/api/skill')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						skills: result.data
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)

		fetch('http://127.0.0.1:8000/api/text/skills_bio')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						bio: result.data
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}


	skill_tab() {
		const skills = this.state.skills;

		var table = [];

			// Create table head
			table.push(
				<thead key="0">
					<tr>
						<th></th>
						<th>Skill</th>
						<th>Level</th>
						<th>Type</th>
					</tr>
				</thead>
			);

			// Create table body
			var tbody = []

			for (var i = 0; i < skills.length; ++i) {
				var item = skills[i];

				const {level, level_class} = this.int_to_level(item.level);

				tbody.push(
					<tr key={item.name}>
						<td><div className="arrow arrow-right"></div></td>
						<td>{item.name}</td>
						<td>
							<span className={level_class}>{level}</span>
						</td>
						<td>
							{this.int_to_target(item.target)}
						</td>
					</tr>
				);
			}
							<span className="web">Web</span>

			table.push(
				<tbody key="1">
					{tbody}
				</tbody>
			);


		return table;
	}


	int_to_level(i) {
		var {level, level_class} = '';

		switch (i) {
			// Low
			case 1:
				level = 'Low';
				level_class = 'low';
				return {level, level_class};
				break;

			// Medium
			case 2:
				level = 'Medium';
				level_class = 'medium';
				return {level, level_class};
				break;

			// High
			case 3:
				level = 'High';
				level_class = 'high';
				return {level, level_class};
				break;

			// Default x Error
			default:
				return {level, level_class};
				break;
		}
	}


	int_to_target(i) {
		switch (i) {
			// Web
			case 0:
				return <span className="web">Web</span>
				break;

			// Desktop
			case 1:
				return <span className="desktop">Desktop</span>
				break;

			// Web / Desktop
			case 2:
				return <div><span className="web">Web</span> / <span className="desktop">Desktop</span></div>
				break;

			// Default x Error
			default:
				return <span>Error</span>;
				break;
		}
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
				<div>
					<div className="skills-tab">
						<div className="retro-borders">
							<div className="b1">
								<div className="b2">
									<table>
										{this.skill_tab()}
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="skills-texts">
						<div className="retro-borders">
							<div className="b1">
								<div className="b2">
									<div className="texts" dangerouslySetInnerHTML={{__html: bio}}>
										
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


class Socials extends React.Component {

	create_list() {
		var list = []

		for (var i = 0; i < this.props.data.length; ++i) {
			var item = this.props.data[i];

			list.push(
				<li class="flex-list-item icon">
					<a href={item[0]} target="_blank">
						<img src={item[1]} />
					</a>
				</li>
			);
		}
		return list;
	}

	render () {
		var truc = 'Truc';
		return (
			<div id="socials-react">
				<ul class="flex-list flex-list-row justify-center icons">
					{this.create_list()}
				</ul>

				<div class="texts">					
					<p class="paragraph">Contactez moi via mes réseaux sociaux</p>
				</div>
			</div>
		);
	}
}