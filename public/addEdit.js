import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showJobs } from "./jobs.js";

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let addingJob = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-job");
  company = document.getElementById("company");
  position = document.getElementById("position");
  status = document.getElementById("status");
  addingJob = document.getElementById("adding-job");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
        if (e.target === addingJob) {
            enableInput(false);
          
            let method = "POST";
            let url = "/api/v1/items";
          
            if (addingJob.textContent === "update") {
              method = "PATCH";
              url = `/api/v1/items/${addEditDiv.dataset.id}`;
            }
          
            try {
              const response = await fetch(url, {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    itemName: company.value,
                    price: position.value,
                    quantity: quantity.value,
                    madeIn: madeIn.value,
                    itemNumber: 1
                }),
              });
          
              const data = await response.json();
              if (response.status === 200 || response.status === 201) {
                if (response.status === 200) {
                  // a 200 is expected for a successful update
                  message.textContent = "The job entry was updated.";
                } else {
                  // a 201 is expected for a successful create
                  message.textContent = "The job entry was created.";
                }
          
                company.value = "";
                position.value = "";
                quantity.value = "";
                madeIn.value = "";
                showJobs();
              } else {
                message.textContent = data.msg;
              }
            } catch (err) {
              console.log(err);
              message.textContent = "A communication error occurred.";
            }
            enableInput(true);
          }
      } else if (e.target === editCancel) {
        message.textContent = "";
        showJobs();
      }
    }
  )
};

export const showAddEdit = async (jobId) => {
    if (!jobId) {
      company.value = "";
      position.value = "";
      quantity.value = "";
      madeIn.value = "";
      addingJob.textContent = "add";
      message.textContent = "";
  
      setDiv(addEditDiv);
    } else {
      enableInput(false);
  
      try {
        const response = await fetch(`/api/v1/items/${jobId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        console.log("DATA>>", data.item.madeIn)
        if (response.status === 200) {
          company.value = data.item.itemName;
          position.value = data.item.price;
          quantity.value = data.item.quantity;
          madeIn.value = data.item.madeIn;
          addingJob.textContent = "update";
          message.textContent = "";
          addEditDiv.dataset.id = jobId;
  
          setDiv(addEditDiv);
        } else {
          // might happen if the list has been updated since last display
          message.textContent = "The jobs entry was not found";
          showJobs();
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showJobs();
      }
  
      enableInput(true);
    }
  };