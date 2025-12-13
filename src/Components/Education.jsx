import {useState} from "react"

export default function EducationalInfo(){
    const [schoolName, setSchoolName]= useState("")
    const [titleOfStudy, setTitleOfStudy] = useState("")
    const [dateOfStudy, setDateOfStudy] = useState("")
    const [visible, setVisible]=useState(false)

    const handleSchoolNameChange=(e)=>{
        setSchoolName(e.target.value)
    }
    const handleTitleOfStudyChange=(e)=>{
        setTitleOfStudy(e.target.value)
    }
    const handleDateOfStudyChange=(e)=>{
        setDateOfStudy(e.target.value)
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
                    
                    <label for="name">Enter your school name</label>
                    <input id="name" type="text" required value={schoolName} onChange={handleSchoolNameChange}/>
                    <label for="titleOfStudy">Enter your title of study</label>
                    <input id="titleOfStudy" required value={titleOfStudy} onChange={handleTitleOfStudyChange}/>
                    <label for="dateOfStudy">Enter your date of study</label>
                    <input id="dateOfStudy" type="number" required value={dateOfStudy} onChange={handleDateOfStudyChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            :
            <div className="output">
                <h1>Educational Information Section</h1>
                <p>{schoolName}</p>
                <p>{titleOfStudy}</p>
                <p>{dateOfStudy}</p>
                <button onClick={toggleVisibility}>Edit</button>       
            </div>
}
        </div>
    )
}
