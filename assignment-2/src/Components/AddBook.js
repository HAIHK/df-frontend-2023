import { useContext, useState } from "react"
import "./BookStore.css"
import { ThemeContext } from "./ThemeContext"

const AddBook = (props) => {
    const { setIsShowAdd, dataTopic, dataBook } = props
    const { theme } = useContext(ThemeContext)

    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [topic, setTopic] = useState(1)

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleSubmit = () => {
        let newBook = {
            id: Math.floor(Math.random() * 100000) + 1,
            name: name,
            author: author,
            topic: dataTopic[topic - 1].name
        }
        setName("")
        setAuthor("")

        let data = localStorage.getItem("DataBook")
        if (data) {
            dataBook.push(newBook)
            localStorage.setItem("DataBook", JSON.stringify(dataBook))
        } else {
            localStorage.setItem("DataBook", JSON.stringify([newBook]))
        }
        setIsShowAdd(false)
    }

    return (
        <section className="modal-container" >
            <div className="modal-box">
                <div className="modal-header" id={theme}>
                    <h3>Add book</h3>
                    <button className="btn-close" onClick={() => setIsShowAdd(false)}>X</button>
                </div>
                <div className="modal-body" id={theme}>
                    <div className="add-book">
                        <div className="form-group">
                            <div className="name">
                                <label>Name</label>
                            </div>
                            <div>
                                <input type="text" className="form-input" value={name} onChange={(event) => handleName(event)} />
                            </div>
                        </div>
                        <div className="form-group" >
                            <div className="name">
                                <label>Author</label>
                            </div>
                            <div>
                                <input type="text" className="form-input" value={author} onChange={(event => handleAuthor(event))} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="name">
                                <label>Topic</label>
                            </div>
                            <div>
                                <select className="form-select" onChange={(event) => setTopic(event.target.value)}>
                                    {dataTopic.map(item => {
                                        return (
                                            <option key={item.id} value={item.id} >{item.name}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="modal-footer" id={theme}>
                    <div>
                        <button className="btn-create" onClick={(event) => handleSubmit(event)} >Create</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddBook