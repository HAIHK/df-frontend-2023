import "./BookStore.css"
import avatar from "../assets/anh.jpg"
import { useContext, useState } from "react"
import AddBook from "./AddBook"
import { ThemeContext } from "./ThemeContext"
import DeleteBook from "./DeleteBook"

const BookStore = () => {
    const { theme, handleTheme } = useContext(ThemeContext)

    const [isShowAdd, setIsShowAdd] = useState(false)
    const [isShowDelete, setIsShowDelete] = useState(false)
    const [searchBook, setSearchBook] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [idBook, setIdBook] = useState(0)
    const [nameBook, setNameBook] = useState("")


    let dataTopic = [
        {
            id: 1,
            name: "Programming"
        },
        {
            id: 2,
            name: "Database"
        },
        {
            id: 3,
            name: "DevOps"
        },
    ]
    let arr = []
    let data = localStorage.getItem("DataBook")

    if (!data) {
        localStorage.setItem("DataBook", JSON.stringify(arr))
    }
    let dataBook = JSON.parse(localStorage.getItem("DataBook"))
    let dataBookStore = dataBook

    let totalPage = 0

    let perBook = []
    perBook = dataBookStore.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)

    let pageNumber = []
    const renderPageNumber = () => {
        totalPage = dataBookStore.length / perPage
        for (let i = 1; i < totalPage + 1; i++) {
            pageNumber.push(i)
        }
    }
    renderPageNumber()

    const handleDelete = (item) => {
        setIsShowDelete(true)
        setIdBook(item.id)
        setNameBook(item.name)
    }

    // console.log("a", nameBook);
    const handlePageNumber = (num) => {
        setCurrentPage(num)
    }

    return (
        <div className="container" id={theme}>
            <header>
                <div className="header-container">
                    <h3>
                        Bookstore
                    </h3>
                    <div className="avatar">
                        <div className="light-mode-container" >
                            <div className="switch" id={theme}>
                                <input type="checkbox" id="checkbox" hidden onChange={() => handleTheme()} />
                                <label className="theme-switch" htmlFor="checkbox" ></label>
                            </div>
                            <div className="light-mode">Light Mode</div>
                        </div>
                        <img src={avatar} alt="" />
                        <span>John Doe</span>
                    </div>
                </div>
            </header>
            <main id={theme}>
                <section className="main-container" >
                    <div className="search">
                        <input type="text" placeholder="Search Book" className="input-search" value={searchBook} onChange={(event) => setSearchBook(event.target.value)} />

                    </div>
                    <div className="add-book">
                        <button type="button" className="btn-add" onClick={() => setIsShowAdd(true)}>Add book</button>
                    </div>
                </section>
                <section className="table-container">
                    <div className="table-box">
                        <table id={theme}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Author</th>
                                    <th>Topic</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {perBook.filter(item => {
                                return searchBook.toLowerCase() === "" ? item : item.name.toLowerCase().includes(searchBook)
                            }).map((item, index) => {
                                return (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td className="table_body">{index + 1}</td>
                                            <td className="table_body">{item.name}</td>
                                            <td className="table_body">{item.author}</td>
                                            <td className="table_body">{item.topic}</td>
                                            <td className="table_body" >
                                                {/* <button className="book-edit" >Edit</button> */}
                                                <button className="book-delete" onClick={() => handleDelete(item)} id={theme}>Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                    <div className="pagination-container">
                        <ul className="pagination">
                            {pageNumber.map((item, index) => {
                                return (
                                    <li className="pagination-item" key={index} onClick={() => handlePageNumber(item)} id={theme}>{item}</li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
                {
                    isShowAdd === true && <AddBook
                        isShowAdd={isShowAdd}
                        setIsShowAdd={setIsShowAdd}
                        dataTopic={dataTopic}
                        dataBook={dataBook}
                    />
                }
                {
                    isShowDelete === true && <DeleteBook
                        isShowDelete={isShowDelete}
                        setIsShowDelete={setIsShowDelete}
                        handleDelete={handleDelete}
                        idBook={idBook}
                        dataBookStore={dataBookStore}
                        nameBook={nameBook}
                    />

                }
            </main>
        </div>
    )
}

export default BookStore