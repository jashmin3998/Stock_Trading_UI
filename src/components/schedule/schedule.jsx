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
  // const DescriptionRenderer = ({ field }) => <textarea {...field} />;

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