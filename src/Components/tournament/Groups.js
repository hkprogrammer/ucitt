
import "./Groups.css"
import {isNull} from '../../static/null';
const GroupStage = (props)=>{

    /**
     * @param {Object} tournamnetInfo - An dictionary object that contains tournament informations
     */
    // const data = props.tournamentInfo;

    var group = props.group;
    var results = props.results;
    console.log({results});
    const numOfParticipants = 4;
    const playerTitle = "Player List";

    
    return (

        <table className="groups-table">
            <thead>
                <tr>
                    <th>
                        {playerTitle}
                    </th>
                    <th>
                        Position
                    </th>
                    <th>
                        W/L
                    </th>
                    {
                        group.map((row)=>{
                            return (
                                <th key={row.seed}>
                                    {row.name}
                                </th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody className="tbody">
                {
                    group.map((team_a)=>{
                        return (

                            <tr key={team_a.key}>
                                <td className="bold">
                                    {team_a.name}
                                </td>
                                <td className="pos">
                                    {team_a.pos}
                                </td>
                                <td>
                                    {team_a.wl}
                                </td>

                                {group.map((team_b)=>{
                                    return(
                                        <td key={String(team_a.key) + String(team_b.key)} className={team_a.name === team_b.name ? 'disbaled' : ''}>

                                            {
                                                team_a.team_id != team_b.team_id &&
                                                !isNull(results[team_a.team_id]) &&
                                                !isNull(results[team_a.team_id][team_b.team_id]) &&
                                                <p>
                                                    {
                                                        String(results[team_a.team_id][team_b.team_id]["winner"] === team_a.team_id ? "W" : "L") + 
                                                        String(results[team_a.team_id][team_b.team_id]["team_a"]) + "-" + 
                                                        String(results[team_a.team_id][team_b.team_id]["team_b"]) 
                                                        
                                                    }                                     
                                                </p>
                                            }
                                        </td>
                                    )
                                })}

                            </tr>

                        )

                    })
                }
            </tbody>
        </table>

    )

}

export default GroupStage;