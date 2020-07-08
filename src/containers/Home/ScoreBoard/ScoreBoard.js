import React, { useEffect } from "react";
import Spinner from "../../../UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

function ScoreBoard(props) {
	useEffect(() => {
		props.onFetchList(props.token, props.userId);
	}, []);

	let list = <Spinner />;

	if (!props.loading)
		list = (
			<ul>
				{props.scoreList.map((scoreCard) => {
					return (
						<li key={scoreCard.key}>
							<span>{scoreCard.moves} moves</span>
							<span>
								<i className="far fa-calendar-alt"></i>{" "}
								{scoreCard.date}
							</span>
						</li>
					);
				})}
			</ul>
		);

	return list;
}

const mapStateToProps = (state) => {
	return {
		scoreList: state.list.scoreList,
		loading: state.list.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchList: (token, userId) =>
			dispatch(actions.fetchScoreBoard(token, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);
