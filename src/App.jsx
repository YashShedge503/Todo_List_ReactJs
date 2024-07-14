import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggle
  

  const handleedit = (e, id)=>{
    let t = todos.filter(i=>i.id == id)
     setTodo(t[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handledelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleadd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, iscomplted: false}])
    setTodo("")
    saveToLS()
  }

  const handlechange = (e)=>{
    setTodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index  = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].iscomplted = !newTodos[index].iscomplted;
    setTodos(newTodos)
    saveToLS()
  }
  
  

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handlechange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleadd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 '>Save</button>
        </div>
        <input type="checkbox" value={showfinished}/>
          <h2 className='text-xl font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item=>{

          return <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handlecheckbox} type="checkbox" value={todo.iscomplted} id="" />
            <div className={item.iscomplted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleedit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
              <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
