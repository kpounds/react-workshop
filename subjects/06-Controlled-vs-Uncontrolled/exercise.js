////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

// Solution shows a better way

class CheckoutForm extends React.Component {
  state = {
    shippingName: "",
    shippingState: "",
    billingName: "",
    billingState: "",
    readOnly: false,
    sameAsBilling: false
  };

  handleCheckbox = e => {
    this.setState({ sameAsBilling: e.target.checked });
    if (e.target.checked) {
      this.setState({
        shippingName: this.state.billingName,
        shippingState: this.state.billingState,
        readOnly: true
      });
    } else {
      this.setState({
        readOnly: false
      });
    }
  };

  checkShippingName = e => {
    this.setState({ billingName: e.target.value });
    if (this.state.sameAsBilling) {
      this.setState({
        shippingName: e.target.value
      });
    }
  };
  checkShippingState = e => {
    this.setState({ billingState: e.target.value });
    if (this.state.sameAsBilling) {
      this.setState({
        shippingState: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    console.log(values);
  };

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name:{" "}
                <input
                  type="text"
                  placeholder="Enter Name"
                  onChange={this.checkShippingName}
                  name="billingName"
                />
              </label>
            </p>
            <p>
              <label>
                Billing State:{" "}
                <input
                  type="text"
                  size="2"
                  placeholder="SS"
                  onChange={this.checkShippingState}
                  name="billingState"
                />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input
                type="checkbox"
                name="sameAsBilling"
                onChange={this.handleCheckbox}
              />{" "}
              Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name:{" "}
                <input
                  type="text"
                  name="shippingName"
                  value={this.state.shippingName}
                  onChange={event => {
                    this.setState({
                      shippingName: this.state.sameAsBilling
                        ? this.state.billingName
                        : event.target.value
                    });
                  }}
                  readOnly={this.state.readOnly}
                />
              </label>
            </p>
            <p>
              <label>
                Shipping State:{" "}
                <input
                  type="text"
                  size="2"
                  name="shippingState"
                  value={this.state.shippingState}
                  onChange={event => {
                    this.setState({
                      shippingState: this.state.sameAsBilling
                        ? this.state.billingState
                        : event.target.value
                    });
                  }}
                  readOnly={this.state.readOnly}
                />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
