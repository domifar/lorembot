import { useState } from "react"
import '../css/FirstConfig.css'
import LoadingScreen from "./LoadingScreen"

const FirstConfig = (props) => {
  const [ipAddress, setIpAddress] = useState("")
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendData = async () => {
    if (!ipAddress || !username) {
      setErrorMessage("Bitte alle Felder ausfüllen!")
      return
    }
    
    setIsLoading(true)
    setErrorMessage("")
    
    const isIpValid = await isValidIpAddress()
    if(!isIpValid) {
      setErrorMessage("IP Adresse nicht korrekt eingegeben!")
      setIsLoading(false)
      return
    }
    
    if(!isValidName()) {
      setErrorMessage("Name nicht korrekt eingegeben!")
      setIsLoading(false)
      return
    }
    
    props.onComplete(false)
    props.newData([ipAddress, username])
    setIsLoading(false)
  }
  

  const isValidIpAddress = async () => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)){3}$/
    
    if (!ipRegex.test(ipAddress)) {
      return false
    }
    
    try {
      const response = await fetch('http://' + ipAddress + ':3000/status')
      const data = await response.json()
      return data.status === 'passt'
    } catch (error) {
      return false
    }
  }

  const isValidName = () => {
    const nameRegex = /^[a-zA-Z0-9]{1,10}$/
    return nameRegex.test(username)
  }

  return (
    <div id="modal-overlay-config">
      {isLoading && <LoadingScreen/>}
      <div id="modal-content-config">
        <div id="firstconfigtitle">IP-Verbindung</div>
        <div id="datainputfields">
            <div className="datainputfield">
            <label>IP-Adresse</label>
            <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="192.168.1.1"
            />
            </div>
            <div className="datainputfield">
            <label>Name</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ihr Name"
            />
            </div>
            <button onClick={sendData} id="confirmbutton">Bestätigen</button>
        </div>
        {errorMessage && <p id="errormessage">{errorMessage}</p>}
      </div>
    </div>
  )
}

export default FirstConfig