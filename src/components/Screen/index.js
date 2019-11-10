/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, ListItem, ContainerDetail } from './styles';

export default function Screen({ listPokemon, selectedIndex, pokemon }) {
	const [isOn, setIsOn] = useState(false);

	const refs = listPokemon.reduce((acc, value, index) => {
		acc[index] = React.createRef();
		return acc;
	}, {});

	useEffect(() => {
		function scrollTo(index) {
			refs[index].current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
		setTimeout(() => {
			setIsOn(!isOn);
		}, 1000);
		if (listPokemon.length > 1 && !pokemon) {
			scrollTo(selectedIndex);
		}
	}, [isOn, listPokemon.length, pokemon, refs, selectedIndex]);

	function listPokemons() {
		return (
			<ul>
				{listPokemon.map(({ name }, i) => (
					<ListItem key={i} isSelected={i === selectedIndex} ref={refs[i]}>
						{name}
					</ListItem>
				))}
			</ul>
		);
	}

	function listDetail() {
		return (
			<ContainerDetail>
				{Object.keys(pokemon).map(key => (
					<div>
						<strong>{key}:</strong> {pokemon[key]}
					</div>
				))}
			</ContainerDetail>
		);
	}

	return (
		<Container data-testid="screen" isOn={isOn} key="screen">
			<p />
			<div>{pokemon ? listDetail() : listPokemons()}</div>
		</Container>
	);
}

Screen.defaultProps = {
	listPokemon: [],
	selectedIndex: 0,
	pokemon: null,
};

Screen.propTypes = {
	listPokemon: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			url: PropTypes.string,
		})
	),
	selectedIndex: PropTypes.number,
	pokemon: PropTypes.shape({
		name: PropTypes.string,
		id: PropTypes.number,
		weight: PropTypes.number,
		height: PropTypes.number,
	}),
};
