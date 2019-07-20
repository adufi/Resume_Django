<!-- React -->
<script src="https://unpkg.com/react@16.4.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.4.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

<!-- React -->
<script type="text/babel" src="{% static 'react/Stars.js' %}"></script>
<script type="text/babel">
	const Socials_data = [
		['#', '{% static 'img/socials/facebook-8bit.png' %}'],
		['#', '{% static 'img/socials/instagram-8bit.png' %}'],
		['#', '{% static 'img/socials/twitter-8bit.png' %}'],
		['#', '{% static 'img/socials/github-8bit.png' %}'],
		['#', '{% static 'img/socials/linkedin-8bit.png' %}'],
	];

	var stars = ReactDOM.render(<Stars />, document.getElementById('test'));
	stars.say_hello();
</script>

class Stars extends React.Component {

	say_hello() {
		console.log('Hello');
	}

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