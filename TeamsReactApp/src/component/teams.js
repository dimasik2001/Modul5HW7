import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTeams, deleteTeam, updateTeam, addTeam } from '../store/actions/teamsActions'
import Players from './players';
import './styles/teamStyle.css'

class teams extends Component {
    constructor(props) {
        super(props);
        this.state = { editedTeam: { id: -1, name: "", country: "" }, isUpdate: false, isAdd: false, selectedTeam: { id: -1, name: "", country: "" } };
        this.onEditClick = this.onEditClick.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUpdateTeam = this.onUpdateTeam.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onAddTeam = this.onAddTeam.bind(this);
        this.OnTeamIdClick = this.OnTeamIdClick.bind(this);

    }
    componentDidMount() {
        this.props.getTeams();
    }
    onAddTeam() {
        debugger
        this.props.addTeam(this.state.editedTeam);
        this.setState({ isAdd: false });
    }
    onDeleteTeam(id) {
        if (this.state.isAdd === true || this.state.isUpdate === true)
            return;
        this.props.deleteTeam(id);
    }
    onUpdateTeam() {
        debugger
        this.props.updateTeam(this.state.editedTeam);
        this.setState({ isUpdate: false });
    }
    onEditClick(id) {
        this.setState({selectedTeam: { id: -1, name: "", country: "" }});
        if (this.state.isAdd === true || this.state.isUpdate === true)
            return;
        const { teams } = this.props.teams;
        let team = teams.find(t => t.id === id)
        this.setState({ editedTeam: { id: team.id, name: team.name, country: team.country }, isUpdate: true });
    }
    onAddClick() {
        this.setState({ isAdd: true, isUpdate: false, editedTeam: { id: -1, name: "", country: "" },selectedTeam: { id: -1, name: "", country: "" } })
    }
    onNameChange(e) {
        e.preventDefault();
        let value = e.target.value;
        this.setState({ editedTeam: { id: this.state.editedTeam.id, name: value, country: this.state.editedTeam.country } });
    }
    onCountryChange(e) {
        e.preventDefault();
        let value = e.target.value;
        this.setState({ editedTeam: { id: this.state.editedTeam.id, name: this.state.editedTeam.name, country: value } });
    }
    OnTeamIdClick(tid) {
        const { teams } = this.props.teams;
        let team = teams.find(t => t.id === tid)
        this.setState({ selectedTeam: team, isAdd: false, isUpdate: false});
    }
    render() {
        const { teams } = this.props.teams;
        let updateForm;
        let addForm;
        let addButton;
        let players
        if(this.state.selectedTeam.id!==-1)
        {
            players = <div><h3>{this.state.selectedTeam.name}</h3><Players teamId={this.state.selectedTeam.id} /></div>
        }
        if (this.state.isUpdate) {
            updateForm =
                <form onSubmit={this.onUpdateTeam}>
                    <input type="text" value={this.state.editedTeam.name}   placeholder = "Name" onChange={this.onNameChange}></input>
                    <input type="text" value={this.state.editedTeam.country}  placeholder = "Country" onChange={this.onCountryChange}></input>
                    <div>
                        <input type="submit" value="Update"></input>
                    </div>
                </form>
        }
        else {
            if (!this.state.isAdd) {
                addButton = <button onClick={this.onAddClick}>New Team</button>
            }
            else {
                addForm = <form onSubmit={this.onAddTeam}>
                    <input type="text" value={this.state.editedTeam.name} placeholder = "Name" onChange={this.onNameChange}></input>
                    <input type="text" value={this.state.editedTeam.country}  placeholder = "Country" onChange={this.onCountryChange}></input>
                    <div>
                        <input type="submit" value="Add"></input>
                    </div>
                </form>
            }
        }

        return (
            <div className="container">
                <div className="info">
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Country</th>
                        </tr>
                        {teams.map(t => {
                            return <tr>
                                <td><button onClick={() => this.OnTeamIdClick(t.id)}>{t.id}</button></td>
                                <td>{t.name}</td>
                                <td>{t.country}</td>
                                <td>
                                    <button onClick={() => this.onEditClick(t.id)} className="table-button">Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => this.onDeleteTeam(t.id)} className="table-button">Delete</button>
                                </td>
                            </tr>
                        }
                        )}
                    </table>
                    {addButton}
                </div>
                <div className="players-list">
                     {players}
                </div>
                <div className="form">{updateForm}{addForm}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ teams: state.teams });

export default connect(mapStateToProps, { getTeams, deleteTeam, updateTeam, addTeam })(teams);