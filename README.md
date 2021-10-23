# Activity Timer Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**UI:**
- Clock in/clock out panel. This panel can work in 2 modes: 

    - Start an activity. User can enter a description of an activity and click on a start button. This action will add a new record in the activity history.
    - Stop an activity. User can see a description of the current activity and have a stop button. By click on this button, a record in the activity history will be updated with an end time.
- Activity grid panel. This panel should show a grid with 4 columns: start time, end time, duration, description.
If an activity is still in progress, end time should be empty and duration should reflect the current duration of this activity.
> if the goal was to only show one panel at a time, this can be implemented via a switch or button etc, a boolean state variable, and a ternary in the JSX of the parent component.
```
const [showTimer,setShowTimer] = useState(true)

return (
    <>
    <button onClick={()=>{setShowTimer(oldBool=>!oldBool)}}>flip</button>
    {showTimer
     ? <Timer />
     : <Table /> 
    }
    </>
)
```

**Data storing:**

- Store the list of activities in the browser session storage.
- Previously-stored activities should be shown on page load if they exist already in session storage. 

**Testing:**

A run-through of the app is done from a user perspective to test utilizing the app, and what the user sees as a result.
