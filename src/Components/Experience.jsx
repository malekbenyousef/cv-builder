import {useState} from "react"

export default function Experience(){
    const [companyName, setCompanyName]= useState("")
    const [positionTitle, setPositionTitle] = useState("")
    const [mainResponsibility, setMainResponsibility] = useState("")
    const [fromIntil, setFromIntil] = useState("")
    const [visible, setVisible]=useState(false)

    const handleCompanyNameChange=(e)=>{
        setCompanyName(e.target.value)
    }
    const handlePositionTitleChange=(e)=>{
        setPositionTitle(e.target.value)
    }
    const handleMainResponsibilityChange=(e)=>{
        setMainResponsibility(e.target.value)
    }
    const handleFromIntilChange=(e)=>{
        setFromIntil(e.target.value)
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
                    
                    <label for="dateOfStudy">Enter your company name</label>
                    <input id="companyName" type="text" required value={companyName} onChange={handleCompanyNameChange}/>
                    <label for="positionTitle">Enter your position title</label>
                    <input id="positionTitle" required value={positionTitle} onChange={handlePositionTitleChange}/>
                    <label for="mainResponsibility">Enter your main responsibility</label>
                    <input id="mainResponsibility" required value={mainResponsibility} onChange={handleMainResponsibilityChange}/>
                    <label for="fromIntil">Enter your the period of your work</label>
                    <input id="fromIntil" required value={fromIntil} onChange={handleFromIntilChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            :
            <div className="output">
                <h1>Experience Section</h1>
                <p>{companyName}</p>
                <p>{positionTitle}</p>
                <p>{mainResponsibility}</p>
                <p>{fromIntil}</p>
                <button onClick={toggleVisibility}>Edit</button>       
            </div>
}
        </div>
    )
}
