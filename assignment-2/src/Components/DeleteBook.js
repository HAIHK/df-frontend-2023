import { useContext } from "react"
import "./BookStore.css"
import { ThemeContext } from "./ThemeContext"

const DeleteBook = (props) => {
    const { setIsShowDelete, idBook, dataBookStore, nameBook } = props
    const { theme } = useContext(ThemeContext)

    const handleDeleteBook = () => {
        let deleteBook = dataBookStore.filter(item => item.id !== idBook)
        localStorage.setItem("DataBook", JSON.stringify(deleteBook))
        setIsShowDelete(false)
    }

    let infoBook = dataBookStore.find(item => item.name === nameBook)

    return (
        <section className="modal-delete">
            <div className="modal-delete-container">
                <div className="modal-delete-header" id={theme}>
                    <h3 className="title">Delete book</h3>
                    <button className="btn-close" onClick={() => setIsShowDelete(false)}>X</button>
                </div>
                <div className="modal-delete-body" id={theme}>
                    <p> Do you want to delete <b>{infoBook.name}</b> book? </p>
                </div>
                <div div className="modal-delete-footer" id={theme}>
                    <button className="btn-delete" onClick={() => handleDeleteBook()}>Delete</button>
                    <button className="btn-cancel" onClick={() => setIsShowDelete(false)}>Cancel</button>
                </div>
            </div>
        </section>
    )
}

export default DeleteBook

