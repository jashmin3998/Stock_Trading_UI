import React from "react";
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

function ScheduleMarket(){
  const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let locations = [
  { id: "1", location: "39357 Hirthe Isle", description: "synergy" },
  {
    id: "2",
    location: "062 Hayes Port",
    description:
      "generate Bond Markets Units European Composite Unit (EURCO) haptic"
  },
  { id: "3", location: "238 Garret Village", description: "Nauru" },
  { id: "4", location: "518 Jared Fort", description: "RSS" },
  { id: "5", location: "7440 Dallas Summit", description: "model customized" },
  {
    id: "6",
    location: "1262 Chaya Terrace",
    description: "National Steel Avon"
  },
  {
    id: "7",
    location: "800 Zieme Port",
    description: "Response Marketing Horizontal"
  },
  { id: "8", location: "4462 Isac Pine", description: "Louisiana Shoes" },
  { id: "9", location: "836 Watsica Freeway", description: "Rubber" },
  { id: "10", location: "556 Frieda Brook", description: "Implementation" },
  {
    id: "11",
    location: "281 Konopelski Club",
    description: "solid state sexy"
  },
  { id: "12", location: "100 Enos Street", description: "payment" },
  {
    id: "13",
    location: "6852 Keebler Loaf",
    description: "generate monitoring"
  },
  {
    id: "14",
    location: "7068 Kulas Lights",
    description: "invoice New Taiwan Dollar"
  },
  {
    id: "15",
    location: "92280 Witting Lights",
    description: "Books installation"
  },
  {
    id: "16",
    location: "53495 Tremblay Plains",
    description: "Practical Plastic Shoes Fresh"
  },
  {
    id: "17",
    location: "73619 Rau View",
    description: "Investor Architect Tugrik"
  },
  {
    id: "18",
    location: "939 Dach Plain",
    description: "International Republic of Korea"
  },
  {
    id: "19",
    location: "74809 Walker Road",
    description: "Ball Massachusetts"
  },
  {
    id: "20",
    location: "7261 Joel Junctions",
    description: "Investment Account blue"
  },
  {
    id: "21",
    location: "609 Jose Field",
    description: "Markets Secured Sri Lanka Rupee"
  },
  {
    id: "22",
    location: "0235 Kessler Locks",
    description: "Liberia Rubber holistic"
  },
  { id: "23", location: "161 Jerald Grove", description: "Fish" },
  {
    id: "24",
    location: "0588 Boyer Streets",
    description: "encoding hub Sports"
  },
  {
    id: "25",
    location: "133 Giovanna Falls",
    description: "implementation back up Wooden"
  },
  {
    id: "26",
    location: "61703 Buck Rue",
    description: "Ergonomic Fresh Fish open-source"
  },
  { id: "27", location: "99154 Gracie Union", description: "pink" },
  { id: "28", location: "23556 Delmer Fort", description: "Data" },
  { id: "29", location: "268 Pollich Meadows", description: "violet vertical" },
  { id: "30", location: "91038 Gutmann Expressway", description: "maximize" },
  {
    id: "31",
    location: "6113 Gislason Turnpike",
    description: "proactive Checking Account copying"
  },
  { id: "32", location: "0648 Dare Harbors", description: "markets program" },
  {
    id: "33",
    location: "766 Kaleigh Springs",
    description: "Investment Account global Global"
  },
  {
    id: "34",
    location: "6438 Novella Corner",
    description: "bypass gold Ohio"
  },
  {
    id: "35",
    location: "1740 Rogahn Meadows",
    description: "national Auto Loan Account"
  },
  {
    id: "36",
    location: "05619 Muller Mission",
    description: "web-enabled SCSI COM"
  },
  { id: "37", location: "0464 Fay Isle", description: "Frozen generate AI" },
  {
    id: "38",
    location: "20412 Domenico Port",
    description: "portals Auto Loan Account Executive"
  },
  {
    id: "39",
    location: "81710 Smitham Stravenue",
    description: "Guernsey initiatives Wyoming"
  },
  {
    id: "40",
    location: "71504 Flo Extension",
    description: "Tasty Fresh Car Practical Concrete Soap"
  },
  {
    id: "41",
    location: "41603 Rossie Crossing",
    description: "RSS Corporate paradigms"
  },
  {
    id: "42",
    location: "771 Simonis Mountain",
    description: "Tenge withdrawal Tools"
  },
  {
    id: "43",
    location: "173 Anastacio Meadow",
    description: "Kentucky bluetooth"
  },
  {
    id: "44",
    location: "7406 Crooks Estate",
    description: "Savings Account bypass"
  },
  {
    id: "45",
    location: "9761 Krajcik Circle",
    description: "invoice Steel payment"
  },
  { id: "46", location: "29643 Miracle Lodge", description: "Bike SMTP" },
  { id: "47", location: "65432 Otilia Villages", description: "Cheese" },
  {
    id: "48",
    location: "840 Ellsworth Parkways",
    description: "Nepalese Rupee Rubber out-of-the-box"
  },
  {
    id: "49",
    location: "494 O'Hara Prairie",
    description: "whiteboard Borders payment"
  },
  {
    id: "50",
    location: "38700 Werner Groves",
    description: "Health orchestrate Kansas"
  }
];

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

let count = locations.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(locations);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (location) => {
    count += 1;
    locations.push({
      ...location,
      id: count
    });
    return Promise.resolve(location);
  },
  update: (data) => {
    const location = locations.find((t) => t.id === data.id);
    location.title = data.title;
    location.description = data.description;
    return Promise.resolve(location);
  },
  delete: (data) => {
    const location = locations.find((t) => t.id === data.id);
    locations = locations.filter((t) => t.id !== location.id);
    return Promise.resolve(location);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Locations"
      fetchItems={(payload) => service.fetchItems(payload)}
      
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm sortable={false}  />
        <Field name="location" label="Title" placeholder="Title" sortable={false} />
        <Field
          name="description"
          label="Description"
          render={DescriptionRenderer}
          sortable={false}
        />
      </Fields>
      {/* <CreateForm
        title="Location Creation"
        message="Create a new location!"
        trigger="Create Location"
        onSubmit={(location) => service.create(location)}
        submitText="Create"
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
      /> */}

      <UpdateForm
        title="Location Update Process"
        message="Update location"
        trigger="Update"
        onSubmit={(location) => service.update(location)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.title) {
            errors.title = "Please, provide location's title";
          }

          if (!values.description) {
            errors.description = "Please, provide location's description";
          }

          return errors;
        }}
      />

      <DeleteForm
        title="Location Delete Process"
        message="Are you sure you want to delete the location?"
        trigger="Delete"
        onSubmit={(location) => service.delete(location)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
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