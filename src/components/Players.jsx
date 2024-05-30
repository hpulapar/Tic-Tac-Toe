
import { useState } from "react";
export default function Players({name,symbol, isActive, onChangeName}){
    const[isEditing, setisEditing]= useState(false);
    const[editedName, setName]= useState(name);
    function changeEdit(){
        setisEditing((editing)=>!editing)
        if(isEditing){
        onChangeName(symbol,editedName)
        }
    }
    function editName(event){
    setName(event.target.value);
    }
    let playername=<span className="player-name">{editedName}</span>
    if(isEditing){
        playername=<input type="text" required value={editedName} onChange={editName}></input>
            }

    return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {playername}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={changeEdit}>{isEditing?'Save':'Edit'}</button>
    </li>
    );
}