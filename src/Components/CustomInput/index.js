import { useState } from 'react'
import "./style.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

const CustomInput = (props) => {

  const [typePass, setTypePass] = useState(true)

  const togglePassType = () => {
    setTypePass(!typePass)
  }

  return (
    <>
      <div className="inputWrapper">
        {props?.label && <label htmlFor={props?.id} className={props?.labelClass}>{props?.label}<span>{props?.required ? '*' : ''}</span></label>}
        {props?.type === 'password'
          ?
          <div className="passwordWrapper">
            <input type={typePass ? 'password' : 'text'} placeholder={props?.placeholder} required={props?.required} id={props?.id} name={props?.name} className={`${props?.inputClass} passInput`} onChange={props?.onChange} value={props.value} />
            <button type='button' className='eyeButton' onClick={togglePassType}><FontAwesomeIcon icon={typePass ? faEyeSlash : faEye} /></button>
          </div>
          :
          props.type === "textarea" ?
          <textarea
            rows={props?.rows}
            placeholder={props?.placeholder}
            disabled={props.disabled}
            id={props?.id}
            name={props?.name}
            className={props?.inputClass}
            onChange={props?.onChange}
            multiple={props?.multiple}
            value={props.value}
            

          />
          :
          <input type={props?.type}
            placeholder={props?.placeholder}
            // required={props?.required}
            disabled={props.disabled}
            id={props?.id}
            name={props?.name}
            className={props?.inputClass}
            onChange={props?.onChange}
            multiple={props?.multiple}
            value={props.value} />
        }
      </div>
    </>
  )
}
export default CustomInput;
