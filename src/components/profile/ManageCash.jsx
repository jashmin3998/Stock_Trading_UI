import React from "react";
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm
  } from "react-crud-table";

function ManageCash(){

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


const ViewStatement = () => (
    <div style={styles.container}>
      <CRUDTable
        caption="Transaction History"
        fetchItems={(payload) => service.fetchItems(payload)}
        
      >
        <Fields>
          <Field name="id" label="Id" hideInCreateForm   />
          <Field name="date" label="Date" placeholder="date"  />
          <Field name="stock" label="Stock" placeholder="Stock"  />
          <Field name="quantity" label="Quantity" placeholder="quanytity"  />
          <Field name="rate" label="Rate" placeholder="rate"  />
          <Field name="amount" label="Amount" placeholder="amount"  />
  
        </Fields>
        
      </CRUDTable>
    </div>
  );

  return(
    <>
      <CashInfo />
      <ViewStatement />
    </>
  )
}

const CashInfo = () => {
  return (
    <>
      <div className="row justify-content-center my-2">
        Balance: $2000
      </div>
      <div className="row justify-content-center my-2">
        <button className="col-1 btn btn-success mr-2">Add</button>
        <button className="col-1 btn btn-danger ml-2">Withdraw</button>
      </div>
    </>
  )
}
export default ManageCash;