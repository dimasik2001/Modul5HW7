import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlayers, deletePlayer, updatePlayer, addPlayer } from '../store/actions/playersActions'
import './styles/teamStyle.css'
export class players extends Component {
    constructor(props) {
        super(props);
        this.state = { teamId: -1, isEdit: false, isAdd: false };
        this.onUpdatePlayer = this.onUpdatePlayer.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onAddPlayer = this.onAddPlayer.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
    }
    componentDidUpdate() {
        this.props.getPlayers(this.props.teamId);
    }
    componentDidMount() {
        this.props.getPlayers(this.props.teamId);
    }
    ondeletePlayer(id) {
        this.props.deletePlayer(id);
    }
    onUpdatePlayer() {
        this.props.updatePlayer(this.state.editedPlayer);
        this.setState({ isEdit: false });
    }
    onAddPlayer() {
        debugger
        this.props.addPlayer(this.state.editedPlayer);
        this.setState({ isAdd: false });
    }

    onFirstNameChange(e) {
        e.preventDefault();
        let value = e.target.value;
        this.setState({ editedPlayer: { id: this.state.editedPlayer.id, firstName: value, lastName: this.state.editedPlayer.lastName, teamId: this.state.editedPlayer.teamId } });
    }
    onLastNameChange(e) {
        e.preventDefault();
        let value = e.target.value;
        this.setState({ editedPlayer: { id: this.state.editedPlayer.id, firstName: this.state.editedPlayer.firstName, lastName: value, teamId: this.state.editedPlayer.teamId } });
    }

    onAddClick() {
        if (this.state.isEdit || this.state.isAdd)
            return;
        this.setState({ editedPlayer: { id: -1, firstName: "", lastName: "", teamId: this.props.teamId }, isAdd: true });
    }
    onEditClick(id) {
        if (this.state.isEdit || this.state.isAdd)
            return;
        const { players } = this.props.players;
        let player = players.find(t => t.id === id)
        this.setState({ editedPlayer: player, isEdit: true });
    }

    render() {
        const { players } = this.props.players
        let updateForm;
        let addButton;
        let addForm;
        if (this.state.isEdit) {
            updateForm =
                <form onSubmit={this.onUpdatePlayer}>
                    <input type="text" value={this.state.editedPlayer.firstName} placeholder="First name" onChange={this.onFirstNameChange}></input>
                    <input type="text" value={this.state.editedPlayer.lastName} placeholder="Last name" onChange={this.onLastNameChange}></input>
                    <div>
                        <input type="submit" value="Update"></input>
                    </div>
                </form>
        }
        else {
            if (!this.state.isAdd)
                addButton = <button onClick={this.onAddClick}>New Player</button>
            else {
                addForm = <form onSubmit={this.onAddPlayer}>
                    <input type="text" value={this.state.editedPlayer.firstName} placeholder="First name" onChange={this.onFirstNameChange}></input>
                    <input type="text" value={this.state.editedPlayer.lastName} placeholder="Last name" onChange={this.onLastNameChange}></input>
                    <div>
                        <input type="submit" value="Add"></input>
                    </div>
                </form>
            }
        }
        return (
            <div>
                <ol>
                    {players.map(p =>
                        <li>
                            <div className="player-in-list">
                                {p.firstName} {p.lastName}
                                <div className="controls">
                                    <button onClick={() => this.onEditClick(p.id)}>Edit</button>
                                    <button onClick={() => this.ondeletePlayer(p.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    )}
                </ol>
                {updateForm}
                {addButton}
                {addForm}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ players: state.players });

export default connect(mapStateToProps, { getPlayers, deletePlayer, updatePlayer, addPlayer })(players);