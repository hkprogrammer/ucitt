
import "./Groups.css"
const GroupStage = (props)=>{

    /**
     * @param {Object} tournamnetInfo - An dictionary object that contains tournament informations
     */
    // const data = props.tournamentInfo;


    const data = {

        participants:[
            {
                
                name: "UCI A",
                seed: 1,
                key:1
            },
            {
                name: "UCI B",
                seed: 2,
                key:2
            },
            {
                name: "UCI C",
                seed: 3,
                key:3,

            },
            {
                name: "UCI D",
                seed: 4,
                key:4
            },   
        ]

    }
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
                        data.participants.map((row)=>{
                            return (
                                <th key={row.key}>
                                    {row.name}
                                </th>
                            )
                        })

                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.participants.map((row)=>{
                        return (

                            <tr key={row.key}>
                                <td>
                                    {row.name}
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>

                                {data.participants.map((innerRow)=>{
                                    return(
                                        <td key={String(row.key) + String(innerRow.key)} className={row.name === innerRow.name ? 'disbaled' : ''}>
    
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