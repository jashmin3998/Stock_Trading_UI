import {React, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";

// Component's Base CSS
import "../../crudTable.css";
import { getSchedules, getUserRole, updateSchedules } from "../../services";
import { timeToseconds } from "../../util";



function ScheduleMarket(){

  const[error, setError] = useState("")
  const[isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
      const fetchUserRole = async () =>{
          try{
              const res = await getUserRole(
                  { params: { username: window.localStorage.getItem("username") } }
              );    
              if(res){
                  setIsAdmin(res.data === "ADMIN" ? true: false);
              }
          }
          catch{
              console.log("Not an admin")
          }           
      }

      fetchUserRole();

  },[])

  return(
      <>
      {isAdmin && <ManageScheduleMarket />}
      
      {isAdmin && <h3>Admin access only</h3>}
      </>
  )
}

function ManageScheduleMarket(){
  // const DescriptionRenderer = ({ field }) => <textarea {...field} />;

  const [schedules, setSchedules] = useState([]);

useEffect(() => {
  const fetchData = async () =>{
      const res = await getSchedules();
      var jsonData = res.data;

      var allData = []
        for (var i = 0; i < jsonData.length; i++) {

            var status = "open"
           
            if(jsonData[i].isHoliday == 1){
              status = "close"
            }
            var counter = {
                            "dates": jsonData[i].dates,
                            "startTime": String(new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(jsonData[i].startTime)),
                            "endTime": String(new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(jsonData[i].endTime)),
                            "status": status
                          }
            allData.push(counter)
        }

        setSchedules(allData)
      
  }
  fetchData();
}, []);

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = schedules.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(schedules);
    //result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  // create: (location) => {
  //   count += 1;
  //   locations.push({
  //     ...location,
  //     id: count
  //   });
  //   return Promise.resolve(location);
  // },
  update: (data) => {
    const schedule = schedules.find((t) => t.dates === data.dates);
    
    const updateSchedule = async (schedule)=>{

      
      var start = (new Date(schedule.dates)).getTime() + timeToseconds(schedule.startTime);
      var end = (new Date(schedule.dates)).getTime() + timeToseconds(schedule.endTime);
      console.log((new Date(schedule.dates)).getTime())
      var holiday = schedule.status === "open" ? 0 : 1;
      let intlDateObj = new Intl.DateTimeFormat('en-US', {
        timeZone: "America/Phoenix"
      });
      console.log(intlDateObj)

      console.log(intlDateObj.format(new Date(schedule.dates)))
      var schedule ={
        "todayDate" : schedule.dates,
        "startTime" : start,
        "endTime" : end,
        "isHoliday": holiday
      }
      try{
        const res = await updateSchedules(schedule)
        if(res.data.success){
          schedule.startTime = data.startTime;
          schedule.endTime = data.endTime;
          schedule.status = data.status;
        }
        else{
          console.log("Schedule upload Fail")
        }
        
      }
      catch{

      }
    }
    updateSchedule(schedule)
    return Promise.resolve(schedule);
  },
  // delete: (data) => {
  //   const location = locations.find((t) => t.id === data.id);
  //   locations = locations.filter((t) => t.id !== location.id);
  //   return Promise.resolve(location);
  // }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Market Schedule"
      fetchItems={(payload) => service.fetchItems(payload)}
      
    >
      <Fields>
        <Field name="dates" label="Date" placeholder="date"  />
        <Field name="startTime" label="Start Time" placeholder="startTime"  />
        <Field name="endTime" label="End Time" placeholder="endTime"  />
        <Field name="status" label="status" placeholder="status"  />
      </Fields>
      <CreateForm
        title="Add Schedule"
        message="Add a new schedule!"
        trigger="Create Schedule"
        onSubmit={(location) => service.create(location)}
        submitText="Add"
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Please, provide location's title";
          }

          if (!values.description) {
            errors.description = "Please, provide location's description";
          }

          return errors;
        }}
      /> 

      <UpdateForm
        title="Schedule Update Process"
        message="Update Schedule"
        trigger="Update"
        onSubmit={(schedule) => service.update(schedule)}
        submitText="Update"
        // validate={(values) => {
        //   const errors = {};

        //   if (!values.id) {
        //     errors.id = "Please, provide id";
        //   }

        //   if (!values.title) {
        //     errors.title = "Please, provide location's title";
        //   }

        //   if (!values.description) {
        //     errors.description = "Please, provide location's description";
        //   }

        //   return errors;
        // }}
      />
    </CRUDTable>
  </div>
);
Example.propTypes = {};
return(
  <Example/>
)

}


export default ScheduleMarket