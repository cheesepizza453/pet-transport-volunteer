import ComponentMainMap from "./component.main.map";
import ComponentMainList from "./component.main.list";
import React, {useState} from "react";
import { VolunteerFormData } from '../../../interface/interface.common';

function ComponentMain(){
  const [markers, setMarkers] = useState<VolunteerFormData[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  return(
    <div>
      <ComponentMainMap markers={markers} setMarkers={setMarkers} selected={selected} setSelected={setSelected}/>
      {/*<ComponentMainAdd markers={markers} setMarkers={setMarkers}/>*/}
      <ComponentMainList markers={markers} setMarkers={setMarkers} selected={selected} setSelected={setSelected}/>
    </div>
  )
}

export default ComponentMain;