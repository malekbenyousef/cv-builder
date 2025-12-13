import {useState} from "react"

export default function GeneralInfo(){
    const [name, setName]= useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [visible, setVisible]=useState(false)

    const handleNameChange=(e)=>{
        setName(e.target.value)
    }
    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const handlePhoneChange=(e)=>{
        setPhone(e.target.value)
    }
    const toggleVisibility=(e)=>{
        e.preventDefault()
        setVisible(visible => !visible) 
    }

    return(
        <div className="container">
        {!visible ? 
            <div className="input">
                <form onSubmit={toggleVisibility}>
                    <label for="name">Enter your full name</label>
                    <input id="name" type="text" required value={name} onChange={handleNameChange}/>
                    <label for="email">Enter your email</label>
                    <input id="email" type="email" required value={email} onChange={handleEmailChange}/>
                    <label for="phone">Enter your phone number</label>
                    <input id="phone" type="number" required value={phone} onChange={handlePhoneChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            :
            <div className="output">
                <h1>General Information Section</h1>
                <p>{name}</p>
                <p>{email}</p>
                <p>{phone}</p>
                <button onClick={toggleVisibility}>Edit</button>
            </div>
}
        </div>
    )
}
