import { useState, useEffect } from "react";
import { centerComponent } from "../hoc";

function List() {
    const [add, setAdd] = useState(false);
    const [inputValue, setInputValue] = useState({ toDo: "" });
    const [list, setList] = useState(() => {
        const savedState = localStorage.getItem("listState");
        return savedState ? JSON.parse(savedState) : [];
    });

    useEffect(() => {
        const savedState = localStorage.getItem("listState");
        if (savedState) {
            setList(JSON.parse(savedState));
        } else {
            setList([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("listState", JSON.stringify(list));
    }, [list]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue({ toDo: "" });

        const id = list.length + 1;

        setList((prevState) => [
            {
                id: id,
                task: inputValue.toDo,
                done: false,
            },
            ...prevState,
        ]);
        setAdd(false);
    };

    const toggleDone = (id) => {
        setList((prevList) => {
            return prevList.map((item) => {
                if (item.id === id) {
                    return { ...item, done: !item.done };
                } else {
                    return item;
                }
            });
        });
    };

    const deleteById = (id) => {
        setList((prevState) => {
            return prevState.filter((i) => i.id !== id);
        });
    };

    // const editTask = (id, newTask) => {
    //     setList((prevList) => {
    //         return prevList.map((item) => {
    //             if (item.id === id) {
    //                 return { ...item, task: newTask };
    //             } else {
    //                 return item;
    //             }
    //         });
    //     });
    // };

    const addItem = () => {
        setAdd((prevState) => !prevState);
    };

    const currentDate = new Date();
    const options = { month: 'long', year: 'numeric', day: 'numeric' };

    return (
        <div className="west-card min-w-1/2 min-h-1/2  flex flex-col justify-center items-start">
            <h1>{currentDate.toLocaleDateString('en-US', options)}</h1>            {add && (
                <form onSubmit={handleSubmit} className="fixed top-[100px]">
                    <input
                        className="border-2 text-black"
                        type="text"
                        name="toDo"
                        value={inputValue.toDo}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleSubmit}>
                        Add
                    </button>
                </form>
            )}
            <div className="fixed bottom-10 right-10">
                <button
                    className="relative w-[50px] h-[50px] border rounded-full border-blue-100 bg-blue-500 z-10"
                    onClick={addItem}
                >
                    <span className="absolute bottom-2/4 right-2/4 translate-x-2/4 translate-y-2/4 w-[25px] h-[5px] bg-white rounded-md"></span>
                    <span className="absolute bottom-2/4 right-2/4 translate-x-2/4 translate-y-2/4 w-[5px] h-[25px] bg-white rounded-md"></span>
                </button>
            </div>

            <h1 className="west-card-title uppercase">You have to do:</h1>
            {list.map((item, index) => (
                <div className="flex gap-5 items-center" key={index}>
                    <button
                        className={`w-[30px] h-[30px] border-2 rounded-full ${item.done ? "border-green-500" : "border-rose-500"}`}
                        onClick={() => toggleDone(item.id)}
                    ></button>
                    <p
                        className="outline-0 border-0"
                        style={item.done ? { textDecoration: "line-through" } : { textDecoration: "none" }}
                        contentEditable={true}
                        onBlur={(e) => {
                            const newTask = e.target.textContent.trim();
                            if (newTask !== "") {
                                setList((prevList) => {
                                    const newList = [...prevList];
                                    newList[index].task = newTask;
                                    return newList;
                                });
                            } else {
                                // Remove the item from the list if the new task is empty
                                deleteById(item.id);
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: item.task }}
                    ></p>

                    <button onClick={() => deleteById(item.id)} className="text-3xl">
                        Delete
                    </button>
                </div>
            ))}

        </div>
    );
}

export default centerComponent(List);
