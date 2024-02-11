
export default function CounterButton({by, incrementMethod, decrementMethod}) {
    // [current state, update function]
    // const [count, setCount]=useState(0)

    // function incrementCounter(){
    //     incrementMethod(by)
    // }
    
    // function decrementCounter(){
    //     decrementMethod(by)
    // }

    return (
      <div className="counter">
        <div>
            <button className="counterButton" 
                onClick={() => incrementMethod(by)}
            >+{by}</button>
            <button className="counterButton" 
                onClick={() => decrementMethod(by)}
            >-{by}</button>
        </div>
      </div>
    )
  }
