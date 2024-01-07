import React from "react";

import "./../styles/dailyexpense.css";

function Dailyexpense() {
  return (
    <div className="daily-expenses-outermost-box">
      <h1>Daily Expenses</h1>
      <div className="daily-expense-table">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Milk</th>
              <td>1 Lr</td>
              <td>Rs. 45</td>
              <td><button type="button" class="btn btn-secondary">Delete</button>
</td>
            </tr>
            <tr>
              <th scope="row">Cylinder</th>
              <td>5</td>
              <td>Rs. 5000</td>
              <td><button type="button" class="btn btn-secondary">Delete</button>
</td>
            </tr>
            <tr>
              <th scope="row">Banana</th>
              <td>5 dozen</td>
              <td>Rs. 150</td>
              <td><button type="button" class="btn btn-secondary">Delete</button>
</td>
            </tr>
            <tr>
              <th>
                <form action="/" method="post">
                  <div className="input-text-item-div">
                  <input
                    type="text"
                    name="newItem"
                    autocomplete="off"
                    required
                  />
                  <button class="btn btn-light" type="submit" name="list" value="<%= listTitle %>">
                    Add
                  </button>
                  </div>
                </form>
              </th>
              <td>
              <form action="/" method="post">
              <div className="input-text-item-div">
                  <input
                    type="text"
                    name="newItem"
                    autocomplete="off"
                    required
                  />
                  <button class="btn btn-light" type="submit" name="list" value="<%= listTitle %>">
                    Add
                  </button>
                  </div>
                </form>
              </td>
              <td>
              <form action="/" method="post">
              <div className="input-text-item-div">
                  <input
                    type="text"
                    name="newItem"
                    autocomplete="off"
                    required
                  />
                  <button class="btn btn-light" type="submit" name="list" value="<%= listTitle %>">
                    Add
                  </button>
                  </div>
                </form>
              </td>
              <td>
              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dailyexpense;
