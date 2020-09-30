import React from 'react';
import './RefillForm.css';

class RefillForm extends React.Component {

    state = {
        refillAmount: '',
        phoneNumber: '',
        errorMessage: '',
    }

    handleAmountChange = (e) => {
        const amount = e.target.value;
        const reg = /^\d+(\.\d{0,2})?$/;
        if (!amount || amount.match(reg)) {
            this.setState(() => ({ refillAmount: amount }));
        }
    }

    handlePhoneNumberChange = (e) => {
        const amount = e.target.value;
        const reg = /^\d+(\.\d{0,2})?$/;
        if (!amount || amount.match(reg)) {
            this.setState(() => ({ phoneNumber: amount }));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const refillAmount = parseFloat(this.state.refillAmount);

        if (isNaN(refillAmount) || refillAmount < 1 || refillAmount > 1000) {
            this.setState(() => ({ errorMessage: "Please enter a value between 1 and 1000" }));
        } else {
            this.props.handleUpdateBalance(refillAmount);
            this.setState(() => ({
                refillAmount: '',
                phoneNumber: '',
                errorMessage: '',
            }));
        }
    }

    render() {
        return (
            <div className="refill-page">
                <h2 className="selected-provider">{this.props.selectedProvider}</h2>
                <p className="balance">Current balance: ${this.props.currentBalance}</p>
                {this.state.errorMessage.length ? <p className="message">{this.state.errorMessage}</p> : null}
                {this.props.responseMessage.length ? <p className="message">{this.props.responseMessage}</p> : null}
                <form className="refill-form">
                    <input
                        type="text"
                        onChange={this.handleAmountChange}
                        value={this.state.refillAmount}
                        placeholder="Enter refill amount"
                        className="number-input"
                    />
                    <input
                        type="text"
                        onChange={this.handlePhoneNumberChange}
                        value={this.state.phoneNumber}
                        placeholder="Enter refill phone number"
                        className="number-input"
                    />
                    <button
                        type="submit"
                        onClick={this.handleSubmit}
                        className="submit-button"
                    >
                        Submit
                    </button>
                </form>

                <button onClick={() => this.props.handleSelectProvider(null)}>Return home</button>
            </div>
        );
    }
}

export default RefillForm;