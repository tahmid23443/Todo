import React, { use, useEffect, useState } from 'react'

const App = () => {
    const [todoData , setTodoData] = useState("")
    const [todoList , setTodoList] = useState([])
    const [editTask , setEditTask] = useState({})
      
    const handleAdd = ()=>{
      const arr = [...todoList]
      if(!todoData.trim())return;
       arr.push({id: Math.floor(Math.random () * 9000 ), data: todoData, iscompleted: false}) ;
       setTodoList(arr)
       setTodoData("")
       localStorage.setItem("todo" , JSON.stringify(arr))
    }
     
   const handledelete = ((data)=>{
      const newdata = todoList.filter((item)=>{
         return item.id != data.id
      })
      setTodoList(newdata)
       localStorage.setItem("todo" , JSON.stringify(newdata))

   })
   const handleEdit = (item)=>{
     setEditTask(item)
    
   }
   const handleUpdate = ()=>{
      todoList.forEach((item, i , arr)=>{
        if(item.id === editTask.id){

          arr.splice(i , 1, editTask)
          setTodoList(arr)
          setEditTask({})
       localStorage.setItem("todo" , JSON.stringify(arr))

        }
          
      })
   }
   const handleCheck = (id)=>{
     const newdata = todoList.map((item)=>{
        if(item.id === id){
          return {...item, iscompleted: !item.iscompleted}
        }
        return item
     })
     setTodoList(newdata)
      localStorage.setItem("todo" , JSON.stringify(newdata))

   }  
   
   
     useEffect(()=>{
      setTodoList(JSON.parse(localStorage.getItem("todo")) || [])
     },[])

  return (
       
          <div className='flex justify-center bg-gray-500 items-center h-dvh flex-col'>
            <div className='flex flex-col gap-5 overflow-auto bg-gray-400 p-10 rounded-xl border border-white '>
               <h1 className='text-center text-2xl'>Todo App</h1>
            <div className='flex gap-3'>
               <input value={todoData} className='border p-3 text-xl text-white rounded-xl w-full' type="text" onChange={(e)=> setTodoData(e.target.value)} />
             <button  className='border p-3 bg-blue-600 rounded-xl text-white hover:text-red-600' onClick={handleAdd} >Add</button>
            </div>
             <div className='flex justify-center'>
                <ol className='list-decimal '>
                    {
                      todoList?.map((item)=>(
                         <li key={item.id}>
                  <div className='container flex items-center justify-content gap-3 mt-10 '>
                        <input type="checkbox" checked={item.iscompleted} onChange={()=> handleCheck(item.id)} />

                       <input value={editTask.id === item.id ? editTask.data : item.data} onChange={(e)=>setEditTask((prev)=>({...prev, data: e.target.value}))}className={`${editTask.id != item.id && 'task'}`}  />
                      {
                        editTask.id === item.id
                        ?
                        <button className='border p-3 bg-green-500 rounded-xl text-white ' onClick={handleUpdate}>Update</button>
                        :
                      <>
                         <button className='border p-3 bg-green-500 rounded-xl text-white 'onClick={()=> handleEdit(item)}>Edit</button>
                    <button className='border p-3 bg-red-600 rounded-xl text-white' onClick={()=> handledelete(item)}>Delete</button>
                    </>
                      }
                  
                  </div>
                  </li>
                      ))
                    }
                </ol>
              </div>
            </div>
       </div>
       
  )
}

export default App
