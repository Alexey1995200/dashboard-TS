import React, {useState} from "react";
//sample of import as ReactComponent -
// @ts-ignore
import {ReactComponent as something} from './something.svg'
interface IState {
  state:string,
  setState: React.Dispatch<React.SetStateAction<string>>
}
const Sample = () => {
//sample of setState typescript:
  const [state, setState] = useState<string>('')




}
export default null