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